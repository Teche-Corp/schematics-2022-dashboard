import axios from 'axios';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import Routes from '@/routes/index';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/App.css';

const App = () => {
  axios.defaults.baseURL =
    'https://schematics-webkes-backend-dev.herokuapp.com/api';

  return (
    <AuthProvider>
      <div>
        <Toaster
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
            error: {
              icon: '😦',
            },
            success: {
              icon: '✅',
            },
          }}
        />
      </div>
      <Routes />
    </AuthProvider>
  );
};

export default App;
