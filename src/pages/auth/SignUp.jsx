import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';

export default function SignUp() {
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit } = methods;

  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      await axios.post('/user/register', data);
      toast.success('Success! You can continue to log in');
      history.push('/signin');
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
        <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
          <AuthHeader headerText='Sign up for new account' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleSignup)}
                >
                  <Input
                    label='Full Name'
                    id='name'
                    validation={{ required: 'Full Name is required' }}
                  />
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    validation={{ required: 'Email is required' }}
                  />

                  <Input
                    label='Phone Number'
                    id='phone'
                    placeholder='+6285123456'
                    validation={{
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^\+628[1-9][0-9]{8,11}$/,
                        message:
                          'Please fill in phone number starting with +62 and correct format',
                      },
                    }}
                  />

                  <PasswordInput
                    label='Password'
                    id='password'
                    validation={{
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message:
                          'Please enter password more than 8 characters.',
                      },
                    }}
                  />

                  <div>
                    <SubmitButton loading={loading}>Sign Up</SubmitButton>
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
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <Link
                    className='flex justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 border-2 border-indigo-600 rounded-md shadow-sm hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    to='/signin'
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
