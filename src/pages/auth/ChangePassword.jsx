import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import AuthHeader from '@/components/AuthHeader';
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from '@/components/SubmitButton';
import Input from '@/components/Input';

export default function ChangePassword() {
  const methods = useForm();
  const history = useHistory();
  const { handleSubmit } = methods;

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data) => {
    try {
      setLoading(true);
      await axios.post('/user/change-password', { ...data });

      setLoading(false);
      toast.success(
        `Password changed successfully, you can sign in with your new password`,
      );
      history.replace('/signin');
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
          <AuthHeader headerText='Change your password' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleChangePassword)}
                >
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    validation={{ required: 'Email is required' }}
                  />

                  <PasswordInput
                    label='Old Password'
                    id='old_password'
                    validation={{
                      required: 'Old Password is required',
                    }}
                  />

                  <PasswordInput
                    label='New Password'
                    id='new_password'
                    validation={{
                      required: 'New Password is required',
                    }}
                  />

                  <div>
                    <SubmitButton loading={loading}>
                      Change Password
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
