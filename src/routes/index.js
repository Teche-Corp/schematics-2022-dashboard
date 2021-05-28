import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { Dashboard } from '@/pages';

import PrivateRoute from './PrivateRoute';

import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/login' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  );
};

export default Routes;
