import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Select from './Select';
import { createSale, requestData, setToken } from '../services/requests';
import useForm from '../hooks/useForm';

function CheckoutForm() {
  const [sellers, setSellers] = useState([]);
  const history = useHistory();
  const [fields, setFormFields] = useForm({
    seller: '',
    address: '',
    addressNumber: '',
  });

  const getSellers = async () => {
    const result = await requestData('/users/seller');
    setSellers(result);
  };

  useEffect(() => {
    getSellers();
  }, []);

  const insertSale = async () => {
    const { products, total } = JSON.parse(localStorage.getItem('cart'));
    const cartProducts = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    const { token } = JSON.parse(localStorage.getItem('user'));

    setToken(token);

    try {
      const result = await createSale('/sales/register', {
        sellerId: fields.seller,
        totalPrice: total,
        deliveryAddress: fields.address,
        deliveryNumber: fields.addressNumber,
        products: cartProducts,
      });
      history.push(`/customer/orders/${result.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-wrap justify-center w-4/6 max-[640px]:w-96 p-5
      max-[640px]:p-3 border-solid border border-gray-400 shadow-md rounded gap-y-10"
    >
      <p className="uppercase font-bold">Detalhes e Endereço para Entrega</p>
      <div className="flex flex-wrap justify-center w-full gap-x-10">
        <div className="w-60 max-[640px]:w-full inline-block">
          <p
            className="w-full block uppercase tracking-wide
            text-xs font-bold mb-2"
          >
            P. Vendedora Responsável:
          </p>
          <div className="relative">
            <Select
              id="seller"
              name="seller"
              options={ sellers }
              value={ fields.seller }
              handleChange={ setFormFields }
              dataTestId="customer_checkout__select-seller"
            />
          </div>
        </div>
        <label
          className="w-60 max-[640px]:w-full max-[640px]:mt-2 uppercase tracking-wide
         text-xs font-bold"
          htmlFor="address"
        >
          Endereço
          <input
            id="address"
            name="address"
            type="text"
            placeholder=""
            onChange={ setFormFields }
            value={ fields.address }
            data-testid="customer_checkout__input-address"
            className="appearance-none block w-full rounded py-3 px-4 my-2
            min-[641px]:-mx-1 border-solid border border-black font-normal text-sm"
          />
        </label>
        <label
          className="w-32 max-[640px]:w-full max-[640px]:mt-2 uppercase
          tracking-wide text-xs font-bold"
          htmlFor="addressNumber"
        >
          Número
          <input
            id="addressNumber"
            name="addressNumber"
            type="text"
            placeholder=""
            onChange={ setFormFields }
            value={ fields.number }
            data-testid="customer_checkout__input-address-number"
            className="appearance-none block w-full rounded py-3 px-4 my-2
            min-[641px]:-mx-1 border-solid border border-black font-normal text-sm"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={ insertSale }
        data-testid="customer_checkout__button-submit-order"
        className="bg-green-800 text-white font-bold p-4 rounded hover:brightness-125"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

export default CheckoutForm;
