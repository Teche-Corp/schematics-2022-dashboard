import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AuthHeader from '@/components/AuthHeader';
import PasswordInput from '@/components/PasswordInput';

export default function ChangePassword() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const handleChangePassword = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
          <AuthHeader headerText='Change your password' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleChangePassword)}
                >
                  <PasswordInput
                    label='Password'
                    id='password'
                    validation={{
                      required: 'Password is required',
                    }}
                  />

                  <div>
                    <button
                      className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      type='submit'
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
