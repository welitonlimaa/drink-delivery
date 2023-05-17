import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, setToken, updateData } from '../services/requests';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import sumTotal from '../utils/totalSum';
import convertDateFormat from '../utils/convertDateFormat';
import Header from '../components/Header';

function OrderId() {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [total, setTotal] = useState(0);
  const params = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  const requestOrderData = async (id) => {
    const { token } = user;
    setToken(token);

    const data = await requestData(`/sales/${id}`);
    setOrderData(data);

    const sum = sumTotal(data.products);
    setTotal(sum);
    setIsLoading(false);
    setStatus(data.status);
  };

  const updateStatus = async (orderStatus) => {
    const { token } = user;
    setToken(token);

    await updateData(`/sales/${orderData.id}`, { status: orderStatus });

    setStatus(orderStatus);
  };

  useEffect(() => {
    requestOrderData(params.id);
  }, [status]);

  if (isLoading) return <Loading />;

  const testPrefix = `${user.role}_order_details__`;

  const digits = 4;

  return (
    <>
      <Header />
      <div className="flex justify-around my-3 capitalize font-bold">
        <span
          data-testid={ `${testPrefix}element-order-details-label-order-id` }
        >
          { `Pedido: ${orderData.id}` }
        </span>
        {
          user.role !== 'customer' ? null : (
            <div>
              <span>
                P. Vendedora:
                {' '}
              </span>
              <span
                data-testid={ `${testPrefix}element-order-details-label-seller-name` }
              >
                { `${orderData.seller.name}` }
              </span>
            </div>
          )
        }
        <span
          data-testid={ `${testPrefix}element-order-details-label-order-date` }
        >
          { convertDateFormat(orderData.saleDate, digits) }
        </span>
        <span
          data-testid={ `${testPrefix}element-order-details-label-delivery-status` }
        >
          { status }
        </span>
        {
          user.role === 'customer' ? (
            <button
              type="button"
              data-testid={ `${testPrefix}button-delivery-check` }
              disabled={ status !== 'Em Trânsito' }
              onClick={ () => updateStatus('Entregue') }
              className="bg-green-600 p-1 text-white hover:brightness-110
              disabled:bg-slate-600"
            >
              MARCAR COMO ENTREGUE
            </button>
          )
            : (
              <div className="text-white">
                <button
                  type="button"
                  data-testid={ `${testPrefix}button-preparing-check` }
                  disabled={ status !== 'Pendente' }
                  onClick={ () => updateStatus('Preparando') }
                  className="bg-green-400 p-1 mx-2 hover:brightness-110"
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  type="button"
                  data-testid={ `${testPrefix}button-dispatch-check` }
                  disabled={ status !== 'Preparando' }
                  onClick={ () => updateStatus('Em Trânsito') }
                  className="bg-green-600 p-1 mx-2 hover:brightness-110"
                >
                  SAIU PARA ENTREGA
                </button>
              </div>
            )
        }
      </div>
      <div className="my-12 max-[640px]:mx-5">
        <div className="flex flex-col overflow-x-auto">
          <OrderTable products={ orderData.products } />
        </div>
        <div className="flex justify-end min-[641px]:w-full min-[641px]:-ml-8">
          <p
            className="w-80 max-[640px]:w-full p-5 my-10
            rounded-lg font-bold text-center text-3xl text-white bg-flamingo-500"
          >
            Total: R$
            {' '}
            <span
              data-testid={ `${testPrefix}element-order-total-price` }
            >
              { (total.toFixed(2)).replace(/\./, ',') }
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderId;
