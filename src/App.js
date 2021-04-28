import React from 'react';

import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
