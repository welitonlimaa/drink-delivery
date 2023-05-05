import React from 'react';
import Proptypes from 'prop-types';

function Cart(props) {
  const { total } = props;
  return (
    <div
      data-testid="customer_products__button-cart"
      className="rounded bg-green-700 font-bold"
    >
      <p>
        Ver Carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">{ total }</span>
      </p>
    </div>
  );
}

Cart.propTypes = {
  total: Proptypes.number.isRequired,
};

export default Cart;
