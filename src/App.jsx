import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

import Routes from '@/routes/index';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/App.css';

const App = () => {
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
      ? 'https://schematics.its.ac.id/api'
      : 'https://schematics-webkes-backend-dev.herokuapp.com/api';

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
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Routes />
      </SWRConfig>
    </AuthProvider>
  );
};

export default App;
