import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';
import useQuery from '@/hooks/useQuery';

const apiUrl =
  process.env.NODE_ENV === 'production' &&
  process.env.PUBLIC_URL === '/dashboard'
    ? 'https://schematics.its.ac.id/api'
    : 'https://schematics-webkes-backend-dev.herokuapp.com/api';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuthState();

  const query = useQuery();
  const redirectTo = query.get('redirect_to');

  if (redirectTo && rest.path === '/signin') {
    window.location.replace(
      `${apiUrl}/auth/login/redirect?redirect_to=${encodeURI(redirectTo)}`,
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div className='flex flex-col items-center justify-center min-h-screen bg-dark text-light'>
            <ImSpinner8 className='mb-2 text-4xl animate-spin' />
            <p>Loading...</p>
          </div>
        ) : authenticated && !redirectTo ? (
          <Redirect to={'/my'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
