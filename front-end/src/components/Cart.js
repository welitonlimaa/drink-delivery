import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../context/AppContext';

function Cart() {
  const [total, setTotal] = useState(0);
  const { productsCart } = useContext(AppContext);
  const sum = () => {
    const sumProducts = productsCart.reduce((acc, curr) => {
      const value = curr.quantity * Number(curr.price);
      return acc + value;
    }, 0);
    setTotal(sumProducts);
  };
  console.log('cart =>>', productsCart);
  useEffect(() => {
    sum();
  }, [productsCart, total]);

  const history = useHistory();
  const handleClick = (endpoint) => {
    history.push(endpoint);
  };

  return (
    <button
      type="button"
      disabled={ total === 0 }
      onClick={ () => handleClick('/customer/checkout') }
      data-testid="customer_products__button-cart"
      className="rounded bg-green-700 font-bold"
    >
      Ver Carrinho: R$
      {' '}
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        { (total.toFixed(2)).replace(/\./, ',') }
      </span>
    </button>
  );
}

export default Cart;
