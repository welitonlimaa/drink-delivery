import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, setToken, updateData } from '../services/requests';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import sumTotal from '../utils/totalSum';
import convertDateFormat from '../utils/convertDateFormat';
import Header from '../components/Header';
import TotalCard from '../components/TotalCard';

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
      <div
        className="flex items-center justify-around flex-col
        min-w-full min-h-screen my-24 mx-auto"
      >
        <div
          className="flex items-center justify-around max-[640px]:justify-between
          flex-wrap min-[641px]:w-4/5 max-[640px]:w-96 max-[640px]:p-2.5 mb-10
          p-10 border-solid border border-gray-400 rounded uppercase font-bold
          shadow-md bg-gray-100"
        >
          <span
            data-testid={ `${testPrefix}element-order-details-label-order-id` }
            className="max-[640px]:w-full max-[640px]:m-1.5"
          >
            { `Pedido: ${orderData.id}` }
          </span>
          {
            user.role !== 'customer' ? null : (
              <div className="max-[640px]:w-full max-[640px]:m-1.5">
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
            className="max-[640px]:w-full max-[640px]:m-1.5"
          >
            { convertDateFormat(orderData.saleDate, digits) }
          </span>
          <span
            data-testid={ `${testPrefix}element-order-details-label-delivery-status` }
            className="max-[640px]:w-full max-[640px]:m-1.5"
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
                className="p-5 max-[640px]:w-full max-[640px]:m-1.5
                max-[640px]:p-1 text-white rounded-2xl disabled:bg-gray-500 bg-green-600"
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
                    className="max-[640px]:w-full max-[640px]:m-1.5 p-5
                    max-[640px]:p-1 mx-2 rounded-2xl bg-green-400 disabled:bg-gray-500"
                  >
                    PREPARAR PEDIDO
                  </button>
                  <button
                    type="button"
                    data-testid={ `${testPrefix}button-dispatch-check` }
                    disabled={ status !== 'Preparando' }
                    onClick={ () => updateStatus('Em Trânsito') }
                    className="max-[640px]:w-full max-[640px]:m-1.5 p-5
                    max-[640px]:p-1 mx-2 rounded-2xl bg-indigo-900 disabled:bg-gray-500"
                  >
                    SAIU PARA ENTREGA
                  </button>
                </div>
              )
          }
        </div>
        <div className="w-4/5 my-12 max-[640px]:mx-5">
          <div className="flex flex-col overflow-x-auto">
            <OrderTable products={ orderData.products } />
          </div>
          <div className="flex justify-end min-[641px]:w-full min-[641px]:-ml-8">
            <TotalCard
              total={ total }
              testPrefix={ testPrefix }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderId;
