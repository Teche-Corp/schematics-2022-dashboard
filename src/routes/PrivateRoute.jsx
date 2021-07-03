import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div className='flex flex-col items-center justify-center min-h-screen bg-dark'>
            <ImSpinner8 className='mb-2 text-4xl text-light animate-spin' />
            <p>Loading...</p>
          </div>
        ) : authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/signin'} />
        )
      }
    />
  );
};

export default PrivateRoute;
