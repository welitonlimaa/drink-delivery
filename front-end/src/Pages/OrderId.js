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

  const requestOrderData = async (id) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
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

  const testPrefix = 'customer_order_details__';

  const digits = 4;

  return (
    <>
      <Header />
      <div>
        <span
          data-testid={ `${testPrefix}element-order-details-label-order-id` }
        >
          { orderData.id }
        </span>
        P. Vend:
        <span
          data-testid={ `${testPrefix}element-order-details-label-seller-name` }
        >
          { orderData.seller.name }
        </span>
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
        <button
          type="button"
          data-testid={ `${testPrefix}button-delivery-check` }
          disabled={ orderData.status !== 'Em Trânsito' }
        >
          MARCAR COMO ENTREGUE
        </button>
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
