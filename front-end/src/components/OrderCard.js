import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import convertDateFormat from '../utils/convertDateFormat';
import AppContext from '../context/AppContext';

function OrderCard({ order }) {
  const { userData } = useContext(AppContext);
  const { role } = userData;
  const {
    id,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  } = order;

  const colorStatus = {
    Entregue: 'green',
    Pendente: 'red',
    Preparando: 'yellow',
    'Em Trânsito': 'orange',
  };

  const digits = 4;

  return (
    <Link
      to={ `/${role}/orders/${id}` }
      className="flex bg-slate-50 m-1 w-72 text-center justify-evenly p-2 shadow-md
      shadow-slate-600 hover:brightness-125 flex-wrap"
    >
      <div className="bg-white p-1">
        <p>Pedido</p>
        <h2 data-testid={ `${role}_orders__element-order-id-${id}` }>{ id }</h2>
      </div>
      <div
        className={
          `flex align-middle text-center capitalize bg-${colorStatus[status]}-400 p-2`
        }
      >
        <p
          data-testid={ `${role}_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>
      </div>
      <div>
        <p
          className="bg-white p-1"
          data-testid={ `${role}_orders__element-order-date-${id}` }
        >
          { convertDateFormat(saleDate, digits) }
        </p>
        <p
          className="bg-white p-1"
          data-testid={ `${role}_orders__element-card-price-${id}` }
        >
          { totalPrice.replace(/\./, ',') }
        </p>
      </div>
      {
        role !== 'seller' ? null : (
          <div className="text-xs w-full text-right">
            <p data-testid={ `seller_orders__element-card-address-${id}` }>
              {
                `${deliveryAddress}, ${deliveryNumber}`
              }
            </p>
          </div>
        )
      }
    </Link>
  );
}

OrderCard.propTypes = {
  order: Proptypes.shape({
    id: Proptypes.number,
    status: Proptypes.string,
    saleDate: Proptypes.string,
    totalPrice: Proptypes.string,
    customer: Proptypes.shape({
      role: Proptypes.string,
    }),
    deliveryAddress: Proptypes.string,
    deliveryNumber: Proptypes.string,
  }).isRequired,
};

export default OrderCard;
