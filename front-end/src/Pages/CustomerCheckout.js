import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CartProductsTable from '../components/CartProductsTable';
import CheckoutForm from '../components/CheckoutForm';

function CustomerCheckout() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setTotal(cart.total);
  }, []);

  return (
    <div>
      <Header />
      <div className="my-8">
        <div className="flex flex-col overflow-x-auto">
          <CartProductsTable setTotal={ setTotal } />
        </div>
        <p>
          Total: R$
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            { (total.toFixed(2)).replace(/\./, ',') }
          </span>
        </p>
      </div>
      <div className="my-8">
        <CheckoutForm />
      </div>
    </div>
  );
}

export default CustomerCheckout;
