import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import sumTotal from '../utils/totalSum';
import convertDateFormat from '../utils/convertDateFormat';
import Header from '../components/Header';

function OrderId() {
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
  };

  useEffect(() => {
    requestOrderData(params.id);
  }, []);

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
          { orderData.status }
        </span>
        {
          user.role === 'customer' ? (
            <button
              type="button"
              data-testid={ `${testPrefix}button-delivery-check` }
              disabled={ orderData.status !== 'Em Trânsito' }
              className="bg-green-600 p-1 text-white hover:brightness-110"
            >
              MARCAR COMO ENTREGUE
            </button>
          )
            : (
              <div className="text-white">
                <button
                  type="button"
                  data-testid={ `${testPrefix}button-preparing-check` }
                  disabled={ orderData.status !== 'Pendente' }
                  className="bg-green-400 p-1 mx-2 hover:brightness-110"
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  type="button"
                  data-testid={ `${testPrefix}button-dispatch-check` }
                  disabled={ orderData.status !== 'Preparando' }
                  className="bg-green-600 p-1 mx-2 hover:brightness-110"
                >
                  SAIU PARA ENTREGA
                </button>
              </div>
            )
        }
      </div>
      <div>
        <OrderTable products={ orderData.products } />
      </div>
      <p>
        Total: R$
        {' '}
        <span
          data-testid={ `${testPrefix}element-order-total-price` }
        >
          { (total.toFixed(2)).replace(/\./, ',') }
        </span>
      </p>
    </>
  );
}

export default OrderId;
