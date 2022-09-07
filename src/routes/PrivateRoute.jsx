import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { authenticated, loading } = useAuthState();
  const { pathname } = useLocation();
  const { user } = useAuthState();

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
            if (user.user_type === 'user') {
              return <Component {...props} />;
            } else if (user.user_type === 'admin') {
              return (
                <Redirect
                  to={{
                    pathname: '/admin',
                    state: { redirect: pathname },
                  }}
                />
              );
            }
            // If current user role not allowed to access this route
          } else {
            return (
              <Redirect
                to={{ pathname: '/login', state: { redirect: pathname } }}
              />
            );
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
