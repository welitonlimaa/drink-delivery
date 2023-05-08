import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import sumTotal from '../utils/totalSum';

function Cart({ productsCart }) {
  const [total, setTotal] = useState(0);

  const sum = () => {
    const sumProducts = sumTotal(productsCart);
    setTotal(sumProducts);
  };

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

Cart.propTypes = {
  productsCart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default Cart;
