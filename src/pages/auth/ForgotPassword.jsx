import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '@/components/Input';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';

export default function ForgotPassword() {
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = methods;

  const handleForgot = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post('/user/forgot-password', data);
      const { jwt: token } = res.data.data;
      localStorage.setItem('token', token);

      setLoading(false);
      toast.success(`Please check your email at ${data.email}`);
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
          <AuthHeader headerText='Reset your password' />
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
                    validation={{ required: 'Email is required' }}
                  />

                  <div>
                    <SubmitButton loading={loading}>
                      Reset Password
                    </SubmitButton>
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
