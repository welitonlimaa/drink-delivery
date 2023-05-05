import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import CustomerProducts from '../Pages/CustomerProducts';
import customerCheckout from '../Pages/customerCheckout';
import sellerOrders from '../Pages/sellerOrders';
import adminManage from '../Pages/adminManage';
import customerOrders from '../Pages/customerOrders';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/customer/checkout" component={ customerCheckout } />
      <Route path="/customer/products" component={ CustomerProducts } />
      <Route path="/customer/orders" component={ customerOrders } />
      <Route path="/seller/orders" component={ sellerOrders } />
      <Route path="/admin/manage" component={ adminManage } />
    </Switch>
  );
}

export default Routes;
