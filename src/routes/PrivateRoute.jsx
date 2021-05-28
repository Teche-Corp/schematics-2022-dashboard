import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '@/contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to={'/signin'} />
      }
    />
  );
};

export default PrivateRoute;
