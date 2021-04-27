import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Dashboard, SignIn } from '../pages';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/login' component={SignIn} />
      </Switch>
    </Router>
  );
};

export default Routes;
