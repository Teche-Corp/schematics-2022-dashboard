import axios from 'axios';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';

import useLoadingToast from '@/hooks/useLoadingToast';

import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import AuthHeader from '@/components/AuthHeader';
import SubmitButton from '@/components/SubmitButton';

export default function SignUp() {
  const history = useHistory();
  const { state } = useLocation();

  const methods = useForm();
  const { handleSubmit } = methods;

  const isLoading = useLoadingToast();

  const handleSignup = (data) => {
    toast.promise(
      axios
        .post('/user/register', data)
        .then((_) => history.push('/signin', state)),
      {
        loading: 'Loading...',
        success: 'Berhasil! Anda bisa masuk ke akun anda',
        error: (err) => err.response.data.msg,
      },
    );
  };

  return (
    <>
      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
          <AuthHeader headerText='Buat akun baru' />
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 text-white border border-gray-700 shadow bg-dark sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-6'
                  onSubmit={handleSubmit(handleSignup)}
                >
                  <Input
                    label='Nama Lengkap'
                    id='name'
                    validation={{ required: 'Nama Lengkap tidak boleh kosong' }}
                  />
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

                  <Input
                    label='Nomor Telepon'
                    id='phone'
                    placeholder='+6285123456'
                    validation={{
                      required: 'Nomor Telepon tidak boleh kosong',
                      pattern: {
                        value: /^\+628[1-9][0-9]{7,11}$/,
                        message:
                          'Nomor Telepon harus diawali +62 dan memiliki panjang 12-16 karakter',
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

                  <div>
                    <SubmitButton loading={isLoading}>Buat Akun</SubmitButton>
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
                      Sudah punya akun?
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <Link
                    className='flex justify-center w-full px-4 py-2 text-sm font-medium border-2 rounded-md shadow-sm text-light-100 border-light-100 hover:text-dark hover:bg-light-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-100'
                    to={{ pathname: '/signin', state }}
                  >
                    Masuk
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
