import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CartProductsTable from '../components/CartProductsTable';
import CheckoutForm from '../components/CheckoutForm';

function CustomerCheckout() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setTotal(cart.total);
  }, []);

  return (
    <div>
      <Header />
      <div className="my-12 max-[640px]:mx-5">
        <div className="flex flex-col overflow-x-auto">
          <CartProductsTable setTotal={ setTotal } />
        </div>
        <div className="flex justify-end min-[641px]:w-full min-[641px]:-ml-8">
          <p
            className="w-80 max-[640px]:w-full p-5 my-10
            rounded-lg font-bold text-center text-3xl text-white bg-flamingo-500"
          >
            Total: R$
            {' '}
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              { (total.toFixed(2)).replace(/\./, ',') }
            </span>
          </p>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full my-14
        text-gray-900 font-normal"
      >
        <CheckoutForm />
      </div>
    </div>
  );
}

export default CustomerCheckout;
