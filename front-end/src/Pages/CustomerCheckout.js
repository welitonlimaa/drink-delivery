import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CartProductsTable from '../components/CartProductsTable';
import CheckoutForm from '../components/CheckoutForm';
import TotalCard from '../components/TotalCard';

function CustomerCheckout() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setTotal(cart.total);
  }, []);

  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-center flex-col
        min-w-full my-12 max-[640px]:mx-5"
      >
        <div className="flex flex-col overflow-x-auto w-full min-[641px]:w-4/5">
          <CartProductsTable setTotal={ setTotal } />
        </div>
        <div className="flex justify-end min-[641px]:w-full min-[641px]:mr-20">
          <TotalCard
            total={ total }
            testPrefix="customer_checkout__"
          />
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full my-14
        text-gray-900 font-normal"
      >
        <CheckoutForm />
      </div>
    </div>
  );
}

export default CustomerCheckout;
