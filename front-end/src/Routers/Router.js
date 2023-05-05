import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import CostumerProducts from '../Pages/CostumerProducts';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ CostumerProducts } />
    </Switch>
  );
}

export default Routes;
