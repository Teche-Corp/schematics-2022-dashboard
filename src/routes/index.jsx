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
import PaymentNPC from '@/pages/npc/PaymentNPC';

import Admin from '@/pages/admin/Admin';
import Voucher from '@/pages/admin/voucher/Voucher';
import AddVoucher from '@/pages/admin/voucher/AddVoucher';
import UpdateUserNLC from '@/pages/admin/nlc/UpdateUserNLC';
import AdminNlc from '@/pages/admin/nlc/AdminNLC';
import AdminNpcSenior from '@/pages/admin/npc/AdminNpcSenior';
import AdminNst from '@/pages/admin/nst/AdminNst';
import AdminReeva from '@/pages/admin/reeva/AdminReeva';
import AdminNpc from '@/pages/admin/npc/AdminNpc';
import AdminNpcJunior from '@/pages/admin/npc/AdminNpcJunior';

const routeItems = [
  {
    auth: 'all',
    route: PrivateRoute,
    key: 'choose-event',
    path: '/choose-event',
    component: ChooseEvent,
    visible: false,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'edit-profile',
    path: '/my/edit-profile',
    component: EditProfile,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-create-team',
    path: '/my/sch-nlc/team/create',
    component: CreateTeam,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-create-team',
    path: '/my/sch-nlc/payment',
    component: PaymentNLC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/my/sch-nlc/team',
    component: EventNLC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-create-team',
    path: '/my/sch-npc/payment',
    component: PaymentNPC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-event',
    path: '/my/sch-npc/team/create/senior',
    component: CreateTeamNPCSenior,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-create-team-junior',
    path: '/my/sch-npc/team/create/junior',
    component: CreateTeamNPCJunior,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-event',
    path: '/my/sch-npc/team',
    component: EventNPC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'dashboard',
    path: '/my',
    component: Dashboard,
    visible: true,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-dashboard',
    path: '/admin/dashboard',
    component: Admin,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-sch-nlc-user-edit',
    path: '/admin/event/sch-nlc/user/:id/edit',
    component: UpdateUserNLC,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-nlc',
    path: '/admin/event/sch-nlc/user',
    component: AdminNlc,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-npc-senior',
    path: '/admin/event/sch-npc/senior',
    component: AdminNpcSenior,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-npc-junior',
    path: '/admin/event/sch-npc/junior',
    component: AdminNpcJunior,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-npc',
    path: '/admin/event/sch-npc',
    component: AdminNpc,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-nst',
    path: '/admin/event/sch-nst',
    component: AdminNst,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-reeva',
    path: '/admin/event/sch-reeva',
    component: AdminReeva,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-add-voucher',
    path: '/admin/voucher/add',
    component: AddVoucher,
    visible: false,
  },
  {
    auth: 'admin',
    route: PrivateRoute,
    key: 'admin-voucher',
    path: '/admin/voucher',
    component: Voucher,
    visible: false,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'signin',
    path: '/signin',
    component: SignIn,
    visible: true,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'signup',
    path: '/signup',
    component: SignUp,
    visible: true,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'forgot',
    path: '/forgot',
    component: ForgotPassword,
    visible: true,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'change-password',
    path: '/change-password',
    component: ChangePassword,
    visible: true,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'reset-password',
    path: '/reset-password',
    component: ResetPassword,
    visible: true,
  },
];

const Routes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>

        {routeItems.map((routeItem) => {
          if (process.env.PUBLIC_URL === '/dashboard' && !routeItem.visible)
            return null;

          return (
            <routeItem.route
              key={routeItem.key}
              auth={routeItem.auth}
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
