import axios from 'axios';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useAuthDispatch } from '@/contexts/AuthContext';

import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';
import UnstyledLink from '@/components/UnstyledLink';

import { bearerToken } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';
import useQuery from '@/hooks/useQuery';

const SignIn = () => {
  const dispatch = useAuthDispatch();
  const { state } = useLocation();
  const query = useQuery();

  const history = useHistory();
  const isLoading = useLoadingToast();

  const methods = useForm();
  const { handleSubmit } = methods;

  const redirectTo = query.get('redirect_to');
  const apiUrl =
    process.env.NODE_ENV === 'production' &&
    process.env.PUBLIC_URL === '/dashboard'
      ? 'https://schematics.its.ac.id/api'
      : 'https://schematics-webkes-backend-dev.herokuapp.com/api';

  const handleLogin = (data) => {
    let tempToken;
    let newBody = redirectTo ? { ...data, redirect_to: redirectTo } : data;

    toast.promise(
      axios
        .post('/user/login', newBody, {
          withCredentials:
            process.env.NODE_ENV === 'production' &&
            process.env.PUBLIC_URL === '/dashboard'
              ? true
              : false,
        })
        .then((res) => {
          const { jwt: token } = res.data.data;
          tempToken = token;
          localStorage.setItem('token', token);

          return axios.post(
            '/user/get-user-info',
            {},
            { headers: { ...bearerToken() } },
          );
        })
        .then((user) => {
          if (redirectTo) {
            window.location.replace(
              `${apiUrl}/auth/login/redirect?redirect_to=${encodeURI(
                redirectTo,
              )}`,
            );
          } else {
            const role = user.data.data.user_role;
            dispatch('LOGIN', { ...user.data.data, token: tempToken });

            if (state?.redirect) {
              history.replace(state.redirect);
            } else if (role === 'user') {
              history.replace('/my');
            } else if (role === 'admin') {
              history.replace('/admin/dashboard');
            }
          }
        }),
      {
        loading: 'Loading...',
        success: 'Berhasil masuk',
        error: (err) => err.response.data.msg,
      },
    );
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-8 bg-dark lg:px-8'>
          <AuthHeader headerText='Masuk ke akun anda' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    validation={{
                      required: 'Email tidak boleh kosong',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email tidak valid',
                      },
                    }}
                  />
                  <PasswordInput
                    label='Password'
                    id='password'
                    validation={{
                      required: 'Password tidak boleh kosong',
                      minLength: {
                        value: 8,
                        message: 'Password harus lebih dari 8 karakter',
                      },
                    }}
                  />
                  <div className='flex flex-row-reverse items-center'>
                    <div className='text-sm'>
                      <UnstyledLink
                        href='/forgot'
                        className='font-medium text-light-100 hover:text-light-700'
                      >
                        Lupa password?
                      </UnstyledLink>
                    </div>
                  </div>

                  <div>
                    <SubmitButton loading={isLoading}>Masuk</SubmitButton>
                  </div>
                </form>
              </FormProvider>

              <div className='mt-6'>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 text-gray-50 bg-dark'>
                      Belum punya akun?
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <Link
                    className='flex justify-center w-full px-4 py-2 text-sm font-medium border-2 rounded-md shadow-sm text-light-100 border-light-100 hover:text-dark hover:bg-light-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-100'
                    to={{ pathname: '/signup', state }}
                  >
                    Buat Akun
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
