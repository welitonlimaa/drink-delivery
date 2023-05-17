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
    <div>
      {/* <Link
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
      </Link> */}
      <Link
        to={ `/${role}/orders/${id}` }
        className="flex justify-evenly flex-col items-center m-1 w-72 text-center
        p-2 border-2 shadow-md shadow-gray-400 rounded-2xl hover:brightness-125 flex-wrap"
      >
        <div className="bg-white p-1">
          <span>Número do Pedido:</span>
          {' '}
          <span data-testid={ `${role}_orders__element-order-id-${id}` }>{id}</span>
        </div>
        {
          status === 'Pendente' ? (
            <div className="w-4/5 h-3 rounded-full bg-gray-200">
              <div className="w-1/4 h-3 rounded-full bg-flamingo-500" />
            </div>
          ) : null
        }
        {
          status === 'Preparando' ? (
            <div className="w-4/5 h-3 rounded-full bg-gray-200">
              <div className="w-2/4 h-3 rounded-full bg-flamingo-500" />
            </div>
          ) : null
        }
        {
          status === 'Em Trânsito' ? (
            <div className="w-4/5 h-3 rounded-full bg-gray-200">
              <div className="w-3/4 h-3 rounded-full bg-flamingo-500" />
            </div>
          ) : null
        }
        {
          status === 'Entregue' ? (
            <div className="w-4/5 h-3 rounded-full bg-gray-200">
              <div className="w-full h-3 rounded-full bg-flamingo-500" />
            </div>
          ) : null
        }
        <div
          className="flex align-middle text-center text-xs capitalize p-2"
        >
          <p
            data-testid={ `${role}_orders__element-delivery-status-${id}` }
          >
            { status }
          </p>
        </div>
        <div className="flex justify-around w-full">
          <p
            className="bg-white p-1"
            data-testid={ `${role}_orders__element-order-date-${id}` }
          >
            {convertDateFormat(saleDate, digits)}
          </p>
          <p
            className="bg-white p-1"
            data-testid={ `${role}_orders__element-card-price-${id}` }
          >
            {`R$ ${totalPrice.replace(/\./, ',')}`}
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
    </div>
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
