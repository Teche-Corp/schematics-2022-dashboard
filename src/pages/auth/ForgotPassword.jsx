import axios from 'axios';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Input from '@/components/Input';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';

import { defaultToastMessage } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';

export default function ForgotPassword() {
  const methods = useForm();
  const { handleSubmit } = methods;
  const isLoading = useLoadingToast();

  const handleForgot = async (data) => {
    toast.promise(axios.post('/user/forgot-password', data), {
      ...defaultToastMessage,
      success: `Silahkan cek email ${data.email} untuk melakukan reset password`,
    });
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
          <AuthHeader headerText='Reset password anda' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleForgot)}
                >
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    validation={{
                      required: 'Email tidak boleh kosong',
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email tidak valid',
                      },
                    }}
                  />

                  <div>
                    <SubmitButton loading={isLoading}>
                      Reset Password
                    </SubmitButton>
                  </div>

                  <div>
                    <Link
                      className='flex justify-center w-full px-4 py-2 text-sm font-medium border-2 rounded-md shadow-sm text-light-100 border-light-100 hover:text-dark hover:bg-light-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-100'
                      to='/signin'
                    >
                      Kembali
                    </Link>
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
