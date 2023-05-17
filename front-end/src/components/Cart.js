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
      disabled={ total === 0 }
      type="button"
      onClick={ () => handleClick('/customer/checkout') }
      data-testid="customer_products__button-cart"
      className="fixed bottom-10 right-10 flex justify-center min-w-fit p-3
      rounded-2xl bg-flamingo-500"
    >
      <div className="flex items-center justify-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-8 w-8 my-2 font-bold text-white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3
            3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114
            60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75
            0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {
          total > 0 ? (
            <div className="block">
              <p
                data-testid="customer_products__checkout-bottom-value"
                className="flex justify-center h-2 min-w-fit items-center
                p-3 text-white font-bold text-2xl bg-flamingo-500"
              >
                {`R$ ${(total.toFixed(2)).replace(/\./, ',')}`}
              </p>
            </div>
          ) : null
        }
      </div>
    </button>
  );
}

Cart.propTypes = {
  productsCart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default Cart;
