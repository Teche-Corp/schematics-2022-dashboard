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
import DashboardTeam from '@/components/DashboardTeam';

import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ChangePassword from '@/pages/auth/ChangePassword';

import EventNLC from '@/pages/nlc/EventNLC';
import CreateTeam from '@/pages/nlc/CreateTeam';
import PaymentNLC from '@/pages/nlc/PaymentNLC';

import EventNPC from '@/pages/npc/EventNPC';
import CreateTeamNPCJunior from '@/pages/npc/CreateTeamNPCJunior';
import CreateTeamNPCSenior from '@/pages/npc/CreateTeamNPCSenior';

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
    key: 'nlc-create-team',
    path: '/sch-nlc/create-team',
    component: CreateTeam,
  },
  {
    auth: 'none',
    route: Route,
    key: 'nlc-create-team',
    path: '/sch-nlc/payment',
    component: PaymentNLC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/sch-nlc',
    component: EventNLC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'npc-event',
    path: '/sch-npc/create-team/senior',
    component: CreateTeamNPCSenior,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'npc-create-team-junior',
    path: '/sch-npc/create-team/junior',
    component: CreateTeamNPCJunior,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/sch-npc',
    component: EventNPC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/sch-npc/team',
    component: DashboardTeam,
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
  {
    auth: 'none',
    route: Route,
    key: 'change-password',
    path: '/change-password',
    component: ChangePassword,
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
