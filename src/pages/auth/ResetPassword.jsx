import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from '@/components/SubmitButton';
import useQuery from '@/hooks/useQuery';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const ResetPassword = () => {
  const query = useQuery();
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const password = useRef({});
  password.current = watch('password', '');

  const handleResetPassword = (data) => {
    console.log(data);
  };

  return (
    <div className='w-full min-h-screen bg-dark-400 flex justify-center items-center'>
      <div className='py-24 px-12 border border-white rounded-lg'>
        <p className='py-2 md:text-5xl text-3xl font-primary text-center w-full text-white'>
          Reset Password
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className='space-y-6 mt-8'
          >
            <Input
              type='hidden'
              defaultValue={query.get('token') ?? ''}
              id={'token'}
            />
            <PasswordInput
              label='Password Baru'
              id='password'
              validation={{
                required: 'Password tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Password harus lebih dari 8 karakter',
                },
              }}
            />
            <PasswordInput
              label='Konfirmasi Password Baru'
              id='password_confirm'
              validation={{
                required: 'Konfirmasi password tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Password harus lebih dari 8 karakter',
                },
                validate: (value) =>
                  value === password.current ||
                  'Password dan Konfirmasi Password Tidak Sama',
              }}
            />
            <div>
              <SubmitButton loading={false}>Kirim</SubmitButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
