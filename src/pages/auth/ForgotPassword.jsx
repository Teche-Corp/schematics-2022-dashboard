import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const ForgotPassword = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const handleLupaPassword = (data) => {
    console.log(data);
  };

  return (
    <div className='w-full min-h-screen bg-dark-400 flex justify-center items-center'>
      <div className='py-24 px-12 border border-white rounded-lg'>
        <p className='py-2 md:text-5xl text-3xl font-primary text-center w-full text-white'>
          Lupa Password
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleLupaPassword)}
            className='space-y-6 mt-8'
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
            <div>
              <SubmitButton loading={false}>Kirim</SubmitButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
