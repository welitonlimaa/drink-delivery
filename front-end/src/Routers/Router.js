import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Products from '../Pages/Products';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default Routes;
