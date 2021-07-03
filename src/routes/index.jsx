import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';

import ChooseEvent from '@/pages/ChooseEvent';
import Dashboard from '@/pages/Dashboard';
import EditProfile from '@/pages/EditProfile';
import DashboardTeam from '@/components/DashboardTeam';

import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ChangePassword from '@/pages/auth/ChangePassword';
import ResetPassword from '@/pages/auth/ResetPassword';

import EventNLC from '@/pages/nlc/EventNLC';
import CreateTeam from '@/pages/nlc/CreateTeam';
import PaymentNLC from '@/pages/nlc/PaymentNLC';

import EventNPC from '@/pages/npc/EventNPC';
import CreateTeamNPCJunior from '@/pages/npc/CreateTeamNPCJunior';
import CreateTeamNPCSenior from '@/pages/npc/CreateTeamNPCSenior';

import Admin from '@/pages/admin/Admin';
import Voucher from '@/pages/admin/Voucher';
import AddVoucher from '@/pages/admin/AddVoucher';
import AdminNLC from '@/pages/admin/nlc/AdminNLC';
import UpdateUserNLC from '@/pages/admin/nlc/UpdateUserNLC';

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
    key: 'edit-profile',
    path: '/my/edit-profile',
    component: EditProfile,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-create-team',
    path: '/my/sch-nlc/team/create',
    component: CreateTeam,
  },
  {
    auth: 'none',
    route: Route,
    key: 'nlc-create-team',
    path: '/my/sch-nlc/payment',
    component: PaymentNLC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/my/sch-nlc/team',
    component: EventNLC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'npc-event',
    path: '/my/sch-npc/team/create/senior',
    component: CreateTeamNPCSenior,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'npc-create-team-junior',
    path: '/my/sch-npc/team/create/junior',
    component: CreateTeamNPCJunior,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/my/sch-npc/team',
    component: EventNPC,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'nlc-event',
    path: 'my/sch-npc/payment',
    component: DashboardTeam,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'dashboard',
    path: '/my',
    component: Dashboard,
  },
  {
    auth: 'private',
    route: PrivateRoute,
    key: 'admin-dashboard',
    path: '/admin/dashboard',
    component: Admin,
  },
  {
    auth: 'none',
    route: Route,
    key: 'admin-add-voucher',
    path: '/admin/voucher/add',
    component: AddVoucher,
  },
  {
    auth: 'none',
    route: Route,
    key: 'admin-voucher',
    path: '/admin/voucher',
    component: Voucher,
  },
  {
    auth: 'none',
    route: Route,
    key: 'admin-sch-nlc-user',
    path: '/admin/sch-nlc/user',
    component: AdminNLC,
  },
  {
    auth: 'auth',
    route: AuthRoute,
    key: 'signin',
    path: '/signin',
    component: SignIn,
  },
  {
    auth: 'auth',
    route: AuthRoute,
    key: 'signup',
    path: '/signup',
    component: SignUp,
  },
  {
    auth: 'auth',
    route: AuthRoute,
    key: 'forgot',
    path: '/forgot',
    component: ForgotPassword,
  },
  {
    auth: 'auth',
    route: AuthRoute,
    key: 'change-password',
    path: '/change-password',
    component: ChangePassword,
  },
  {
    auth: 'auth',
    route: AuthRoute,
    key: 'reset-password',
    path: '/reset-password',
    component: ResetPassword,
  },
];

const Routes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        <Route path='/admin/sch-nlc/user/:id/edit' component={UpdateUserNLC} />

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
