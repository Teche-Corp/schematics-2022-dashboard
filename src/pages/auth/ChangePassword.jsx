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
        'Password berhasil diubah, anda bisa masuk dengan password baru anda.',
      );
      history.replace('/signin');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
          <AuthHeader headerText='Ubah password' />
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
                    validation={{
                      required: 'Email tidak boleh kosong',
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email tidak valid',
                      },
                    }}
                  />

                  <PasswordInput
                    label='Password Lama'
                    id='old_password'
                    validation={{
                      required: 'Password lama tidak boleh kosong',
                      minLength: {
                        value: 8,
                        message: 'Password lama harus lebih dari 8 karakter',
                      },
                    }}
                  />

                  <PasswordInput
                    label='Password Baru'
                    id='new_password'
                    validation={{
                      required: 'Password baru tidak boleh kosong',
                      minLength: {
                        value: 8,
                        message: 'Password baru harus lebih dari 8 karakter',
                      },
                    }}
                  />

                  <div>
                    <SubmitButton loading={loading}>Ubah Password</SubmitButton>
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
