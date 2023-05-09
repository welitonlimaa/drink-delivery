import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import CustomerProducts from '../Pages/CustomerProducts';
import CustomerCheckout from '../Pages/CustomerCheckout';
import CustomerOrders from '../Pages/CustomerOrders';
import SellerOrders from '../Pages/SellerOrders';
import AdminManage from '../Pages/AdminManage';
import CustomerOrderId from '../Pages/CustomerOrderId';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/customer/checkout" component={ CustomerCheckout } />
      <Route path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route path="/customer/orders/:id" component={ CustomerOrderId } />
      <Route path="/seller/orders" component={ SellerOrders } />
      <Route path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}

export default Routes;
