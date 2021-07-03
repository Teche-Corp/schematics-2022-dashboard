import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { useAuthDispatch } from '@/contexts/AuthContext';

import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';

const SignIn = () => {
  const dispatch = useAuthDispatch();

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post('/user/login', data);
      const { jwt: token } = res.data.data;
      localStorage.setItem('token', token);

      const user = await axios.post(
        '/user/get-user-info',
        {},
        {
          headers: {
            Token: token,
          },
        },
      );

      dispatch('LOGIN', { ...user.data.data, token });
      setLoading(false);
      history.replace('/my');
    } catch (err) {
      console.error(err);
      toast.error('Uh oh! Something is wrong, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-8 bg-dark lg:px-8'>
          <AuthHeader headerText='Sign in to your account' />
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
                    validation={{ required: 'Email is required' }}
                  />
                  <PasswordInput
                    label='Password'
                    id='password'
                    validation={{
                      required: 'Password is required',
                    }}
                  />
                  <div className='flex flex-row-reverse items-center'>
                    <div className='text-sm'>
                      <a
                        href='/forgot'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <SubmitButton loading={loading}>Sign in</SubmitButton>
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
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <Link
                    className='flex justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 border-2 border-indigo-600 rounded-md shadow-sm hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    to='/signup'
                  >
                    Sign Up
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
