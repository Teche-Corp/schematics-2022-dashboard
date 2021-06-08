import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import ChooseEvent from '@/pages/ChooseEvent';
import Dashboard from '@/pages/Dashboard';
import EditProfile from '@/pages/EditProfile';
import { Dashboard as NLCDashboard } from '@/pages/nlc/Dashboard';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ForgotPassword from '@/pages/ForgotPassword';
import DashboardTeam from '@/components/DashboardTeam';
import EventNPC from '@/pages/EventNPC';

const routeItems = [
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'choose-event',
    path: '/choose-event',
    component: ChooseEvent,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'edit-profile',
    path: '/edit-profile',
    component: EditProfile,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-team',
    path: '/my/sch-nlc/team',
    component: NLCDashboard,
  },
  {
    auth: 'none',
    route: Route,
    key: 'signin',
    path: '/signin',
    component: SignIn,
  },
  {
    auth: 'none',
    route: Route,
    key: 'signup',
    path: '/signup',
    component: SignUp,
  },
  {
    auth: 'none',
    route: Route,
    key: 'forgot',
    path: '/forgot',
    component: ForgotPassword,
  },
];

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        {routeItems.map((routeItem) => {
          return (
            <routeItem.route
              key={routeItem.key}
              path={routeItem.path}
              component={routeItem.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
