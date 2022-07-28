import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
// comment
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

import EventNST from '@/pages/nst/EventNST';

import Admin from '@/pages/admin/Admin';
import Voucher from '@/pages/admin/voucher/Voucher';
import AddVoucher from '@/pages/admin/voucher/AddVoucher';
import UpdateUserNLC from '@/pages/admin/nlc/UpdateUserNLC';
import AdminNLC from '@/pages/admin/nlc/AdminNLC';
import AdminNpcSenior from '@/pages/admin/npc/AdminNpcSenior';
import UpdateUserNpcSenior from '@/pages/admin/npc/UpdateUserNpcSenior';
import AdminNst from '@/pages/admin/nst/AdminNst';
import AdminReeva from '@/pages/admin/reeva/AdminReeva';
import AdminNpc from '@/pages/admin/npc/AdminNpc';
import AdminNpcJunior from '@/pages/admin/npc/AdminNpcJunior';
import UpdateUserNpcJunior from '@/pages/admin/npc/UpdateUserNpcJunior';
// -- comment
import PageNotFound from '@/pages/error/404';
// import Error500 from '@/pages/error/500';

// import { DEADLINE_NLC, DEADLINE_NPC } from '@/lib/constants';
// import EventReeva from '@/pages/reeva/EventReeva';
import Landing from '@/pages/Landing';
// import GeneralEventDashboard from '@/components/GeneralEventDashboard';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import PaymentTeam from '@/pages/nlc/PaymentTeam';
import CreateTeamKetua from '@/pages/nlc/CreateTeamKetua';
import JoinTeam from '@/pages/nlc/JoinTeam';
import CreateTeamSeniorKetua from '@/pages/npc/CreateTeamSeniorKetua';
import PaymentTeamSenior from '@/pages/npc/PaymentTeamSenior';
import JoinTeamSenior from '@/pages/npc/JoinTeamSenior';
import DashboardNPC from '@/pages/npc/DashboardNPC';
import DashboardNLC from '@/pages/nlc/DashboardNLC';
import PaymentTeamJunior from '@/pages/npc/PaymentTeamJunior';
import CreateTeamJuniorKetua from '@/pages/npc/CreateTeamSeniorKetua';
import AdminPaginationNLC from '@/pages/admin/nlc/AdminPaginationNLC';
import AdminPaginationNPC from '@/pages/admin/npc/AdminPaginationNPC';
import NSTregister from '@/pages/nst/NSTregister';
// import CreateTeamKetua from '@/pages/nlc/CreateTeamKetua';

// const routeItems = [
//   {
//     auth: 'all',
//     route: PrivateRoute,
//     key: 'choose-event',
//     path: '/choose-event',
//     component: ChooseEvent,
//     visible: false,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'edit-profile',
//     path: '/my/edit-profile',
//     component: EditProfile,
//     visible: true,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nlc-create-team',
//     path: '/my/sch-nlc/team/create',
//     component: CreateTeam,
//     visible: new Date() < DEADLINE_NLC,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nlc-create-team',
//     path: '/my/sch-nlc/payment',
//     component: PaymentNLC,
//     visible: new Date() < DEADLINE_NLC.setDate(DEADLINE_NLC.getDate() + 3),
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nlc-event',
//     path: '/my/sch-nlc/team',
//     component: EventNLC,
//     visible: true,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nlc-create-team',
//     path: '/my/sch-npc/payment',
//     component: PaymentNPC,
//     visible: new Date() < DEADLINE_NPC.setDate(DEADLINE_NPC.getDate() + 3),
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'npc-event',
//     path: '/my/sch-npc/team/create/senior',
//     component: CreateTeamNPCSenior,
//     visible: new Date() < DEADLINE_NPC,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'npc-create-team-junior',
//     path: '/my/sch-npc/team/create/junior',
//     component: CreateTeamNPCJunior,
//     visible: new Date() < DEADLINE_NPC,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nlc-event',
//     path: '/my/sch-npc/team',
//     component: EventNPC,
//     visible: true,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'nst-event',
//     path: '/my/sch-nst/ticket',
//     component: EventNST,
//     visible: true,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'reeva-event',
//     path: '/my/sch-reeva/ticket',
//     component: EventReeva,
//     visible: true,
//   },
//   {
//     auth: 'user',
//     route: PrivateRoute,
//     key: 'dashboard',
//     path: '/my',
//     component: Dashboard,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-dashboard',
//     path: '/admin/dashboard',
//     component: Admin,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-sch-nlc-user-edit',
//     path: '/admin/sch-nlc/user/:id/edit',
//     component: UpdateUserNLC,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-nlc',
//     path: '/admin/sch-nlc/user',
//     component: AdminNLC,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-sch-npc-senior-user-edit',
//     path: '/admin/sch-npc/senior/user/:id/edit',
//     component: UpdateUserNpcSenior,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-npc-senior',
//     path: '/admin/sch-npc/senior/user',
//     component: AdminNpcSenior,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-sch-npc-junior-user-edit',
//     path: '/admin/sch-npc/junior/user/:id/edit',
//     component: UpdateUserNpcJunior,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-npc-junior',
//     path: '/admin/sch-npc/junior/user',
//     component: AdminNpcJunior,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-npc',
//     path: '/admin/sch-npc',
//     component: AdminNpc,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-nst',
//     path: '/admin/sch-nst/user',
//     component: AdminNst,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-reeva',
//     path: '/admin/sch-reeva/user',
//     component: AdminReeva,
//     visible: false,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-add-voucher',
//     path: '/admin/voucher/add',
//     component: AddVoucher,
//     visible: true,
//   },
//   {
//     auth: 'admin',
//     route: PrivateRoute,
//     key: 'admin-voucher',
//     path: '/admin/voucher',
//     component: Voucher,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'signin',
//     path: '/signin',
//     component: SignIn,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'signup',
//     path: '/signup',
//     component: SignUp,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'forgot',
//     path: '/forgot',
//     component: ForgotPassword,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'change-password',
//     path: '/change-password',
//     component: ChangePassword,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'reset-password',
//     path: '/reset-password',
//     component: ResetPassword,
//     visible: true,
//   },
//   {
//     auth: 'all',
//     route: AuthRoute,
//     key: 'error-500',
//     path: '/maintenance',
//     component: Error500,
//     visible: true,
//   },
// ];

const routeItems = [
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'home',
    path: '/landing',
    component: Landing,
    visible: true,
  },
  {
    auth: 'all',
    route: PrivateRoute,
    key: 'test-dashboard-nlc',
    path: '/test-dashboard-nlc',
    component: AdminPaginationNLC,
    visible: true,
  },
  {
    auth: 'all',
    route: PrivateRoute,
    key: 'test-dashboard-npc',
    path: '/test-dashboard-npc',
    component: AdminPaginationNPC,
    visible: true,
  },
  {
    auth: 'all',
    route: AuthRoute,
    key: 'login',
    path: '/login',
    component: Login,
    visible: true,
  },
  {
    auth: 'user',
    route: AuthRoute,
    key: 'register',
    path: '/register',
    component: Register,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-create-team',
    path: '/nlc/registration',
    component: CreateTeamKetua,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-payment',
    path: '/nlc/payment',
    component: PaymentTeam,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-join-team',
    path: '/nlc/join_team',
    component: JoinTeam,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nlc-dashboard',
    path: '/nlc',
    component: DashboardNLC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-dashboard',
    path: '/npc',
    component: DashboardNPC,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-senior-create-team',
    path: '/npc_senior/registration',
    component: CreateTeamSeniorKetua,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-senior-payment',
    path: '/npc_senior/payment',
    component: PaymentTeamSenior,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-senior-join-team',
    path: '/npc_senior/join_team',
    component: JoinTeamSenior,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-junior-create-team',
    path: '/npc_junior/registration',
    component: CreateTeamJuniorKetua,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'npc-junior-payment',
    path: '/npc_junior/payment',
    component: PaymentTeamJunior,
    visible: true,
  },
  {
    auth: 'user',
    route: PrivateRoute,
    key: 'nst-registration',
    path: '/nst/registration',
    component: NSTregister,
    visible: true,
  },
];

const Routes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
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
        <Route path='*' component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
