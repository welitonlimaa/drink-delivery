import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { requestData, setToken } from '../services/requests';
import OrderList from '../components/OrderList';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const result = await requestData('/sales');
    setOrders(result);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <main>
      <Header />
      <OrderList orders={ orders } />
    </main>
  );
}

export default CustomerOrders;
