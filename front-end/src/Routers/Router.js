import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Products from '../Pages/Products';
import Checkout from '../Pages/Checkout';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default Routes;
