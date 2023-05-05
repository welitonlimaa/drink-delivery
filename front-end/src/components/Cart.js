import React from 'react';
import Proptypes from 'prop-types';

function Cart(props) {
  const { total } = props;
  return (
    <div className="rounded bg-green-700 font-bold">
      <p>
        Ver Carrinho: R$
        {' '}
        <span>{ total }</span>
      </p>
    </div>
  );
}

Cart.propTypes = {
  total: Proptypes.number.isRequired,
};

export default Cart;
