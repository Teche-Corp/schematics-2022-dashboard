import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div className='flex flex-col items-center justify-center min-h-screen bg-dark text-light'>
            <ImSpinner8 className='mb-2 text-4xl animate-spin' />
            <p>Loading...</p>
          </div>
        ) : authenticated ? (
          <Redirect to={'/my'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
