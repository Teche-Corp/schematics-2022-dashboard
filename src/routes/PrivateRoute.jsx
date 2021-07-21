import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import { useAuthState } from '@/contexts/AuthContext';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { authenticated, loading, user } = useAuthState();

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
            if (auth !== 'all' && user?.user_role !== auth) {
              console.log('halo', user?.user_role, auth);
              return user?.user_role === 'user' ? (
                <Redirect to={'/my'} />
              ) : (
                <Redirect to={'/admin/dashboard'} />
              );
            } else {
              return <Component {...props} />;
            }
          } else {
            return <Redirect to={'/signin'} />;
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
