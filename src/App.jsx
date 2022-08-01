import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

import 'react-image-lightbox/style.css';

import Routes from '@/routes/index';
import { AuthProvider } from '@/contexts/AuthContext';
// import { TeamProvider } from '@/contexts/TeamContext';

import '@/App.css';
import { bearerToken } from './lib/helper';

const App = () => {
  // axios.defaults.baseURL =
  //   process.env.NODE_ENV === 'production' &&
  //   process.env.PUBLIC_URL === '/dashboard'
  //     ? 'schematics.its.ac.id'
  //     : 'https://deploy-laravel.herokuapp.com/api';

  axios.defaults.baseURL = 'https://schematics.its.ac.id:8081/api';

  // axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
  axios.interceptors.response.use(undefined, async function (err) {
    // const originalRequest = err.config;

    if (err.response.status === 503) {
      return (window.location.href = `${process.env.PUBLIC_URL}/maintenance`);
    }
    // else if (err.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   const res = await axios.post('/user/refresh-auth-token', {});

    //   const { jwt: token } = res.data.data;
    //   localStorage.setItem('token', token);

    //   return axios(originalRequest);
    // }

    return Promise.reject(err);
  });

  return (
    <AuthProvider>
      {/* <TeamProvider> */}
      <div>
        <Toaster
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
      <SWRConfig
        value={{
          fetcher: (url) =>
            axios
              .get(url, { headers: { ...bearerToken() } })
              .then((res) => res.data),
        }}
      >
        <Routes />
      </SWRConfig>
      {/* </TeamProvider> */}
    </AuthProvider>
  );
};

export default App;
