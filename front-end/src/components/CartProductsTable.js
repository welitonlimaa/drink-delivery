import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductTable from './ProductTable';
import sumTotal from '../utils/totalSum';

function CartProductsTable({ setTotal }) {
  const [productsCart, setProductsCart] = useState([]);

  const remove = (id) => {
    const newProductsCart = productsCart.filter((data) => data.id !== id);
    const total = sumTotal(newProductsCart);
    const cart = { products: [...newProductsCart], total };
    localStorage.setItem('cart', JSON.stringify(cart));
    setTotal(total);
    setProductsCart(newProductsCart);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setProductsCart(cart.products);
  }, []);

  return (
    <table className="min-w-full text-left text-lg font-light">
      <thead
        className="border-b font-medium dark:border-neutral-500"
      >
        <tr>
          <th scope="col" className="px-6 py-4">
            Item
          </th>
          <th scope="col" className="px-6 py-4">
            Descrição
          </th>
          <th scope="col" className="px-6 py-4">
            Quantidade
          </th>
          <th scope="col" className="px-6 py-4">
            Valor Unitário
          </th>
          <th scope="col" className="px-6 py-4">
            Sub-total
          </th>
          <th scope="col" className="px-6 py-4">
            Remover Item
          </th>
        </tr>
      </thead>
      <tbody>
        {
          productsCart.map(({ id, name, price, quantity, urlImage }, index) => (
            <ProductTable
              key={ index }
              item={ index }
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
              hasButton
              quantity={ quantity }
              remove={ remove }
            />))
        }
      </tbody>
    </table>
  );
}

CartProductsTable.propTypes = {
  setTotal: PropTypes.func.isRequired,
};

export default CartProductsTable;
