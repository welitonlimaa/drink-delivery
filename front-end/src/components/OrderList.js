import React from 'react';
import Proptypes from 'prop-types';
import OrderCard from './OrderCard';

function OrderList({ orders }) {
  return (
    <section className="flex flex-wrap w-4/5 mx-auto my-5 justify-center">
      {
        orders.map((order) => (<OrderCard key={ order.id } order={ order } />))
      }
    </section>
  );
}

OrderList.propTypes = {
  orders: Proptypes.shape([
    Proptypes.shape({}),
  ]).isRequired,
};

export default OrderList;
