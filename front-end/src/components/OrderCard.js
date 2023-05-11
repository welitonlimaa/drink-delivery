import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import convertDateFormat from '../utils/convertDateFormat';

function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;
  const colorStatus = {
    Entregue: 'green',
    Pendente: 'red',
    Preparando: 'yellow',
    'Em Trânsito': 'orange',
  };
  return (
    <Link
      to={ `/customer/orders/${id}` }
      className="flex bg-slate-50 m-1 w-60 text-center justify-evenly p-2 shadow-md
      shadow-slate-600 hover:brightness-125"
    >
      <div className="bg-white p-1">
        <p>Pedido</p>
        <h2 data-testid={ `customer_orders__element-order-id-${id}` }>{ id }</h2>
      </div>
      <div
        className={
          `flex align-middle text-center uppercase bg-${colorStatus[status]}-400 p-2`
        }
      >
        <p
          data-testd={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>
      </div>
      <div>
        <p
          className="bg-white p-1"
          data-testd={ `customer_orders__element-order-date-${id}` }
        >
          { convertDateFormat(saleDate, 2) }
        </p>
        <p
          className="bg-white p-1"
          data-testd={ `customer_orders__element-card-price-${id}` }
        >
          { totalPrice.replace(/\./, ',') }
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: Proptypes.shape({
    id: Proptypes.number,
    status: Proptypes.string,
    saleDate: Proptypes.string,
    totalPrice: Proptypes.string,
  }).isRequired,
};

export default OrderCard;
