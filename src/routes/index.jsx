import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '@/pages/Dashboard';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
};

export default Routes;
