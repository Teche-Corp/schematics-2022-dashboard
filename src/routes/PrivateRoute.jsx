import React from 'react';

import { Redirect, Route, useLocation } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { authenticated, loading, user } = useAuthState();
  const { pathname } = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-dark text-light'>
              <ImSpinner8 className='mb-2 text-4xl animate-spin' />
              <p>Loading...</p>
            </div>
          );
        } else {
          if (authenticated) {
            // If current user role not allowed to access this route
            if (auth !== 'all' && user?.user_role !== auth) {
              return user?.user_role === 'user' ? (
                <Redirect to={'/my'} />
              ) : (
                <Redirect to={'/admin/dashboard'} />
              );
            } else {
              return <Component {...props} />;
            }
          } else {
            return (
              <Redirect
                to={{ pathname: '/signin', state: { redirect: pathname } }}
              />
            );
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
