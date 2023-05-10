import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';
import Loading from '../components/Loading';

function CustomerOrderId() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState({});
  const params = useParams();

  const requestOrderData = async (id) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);

    const data = await requestData(`/sales/${id}`);
    setOrderData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    requestOrderData(params.id);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <span>{ orderData.id }</span>
      P. Vend:
      <span>a</span>
      <span>a</span>
      <span>a</span>
      <button
        type="button"
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

export default CustomerOrderId;
