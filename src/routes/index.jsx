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
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ForgotPassword from '@/pages/ForgotPassword';
import DashboardTeam from '@/components/DashboardTeam';
import EventNPC from '@/pages/EventNPC';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        <PrivateRoute path='/choose-event' component={ChooseEvent} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <PrivateRoute path='/sch-npc' component={EventNPC} />
        <PrivateRoute path='/sch-npc/team' component={DashboardTeam} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/forgot' component={ForgotPassword} />
      </Switch>
    </Router>
  );
};

export default Routes;
