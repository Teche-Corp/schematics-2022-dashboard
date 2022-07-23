import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from '@/components/SubmitButton';
import UnstyledLink from '@/components/UnstyledLink';
import axios from 'axios';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const { state } = useLocation();
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const password = useRef({});
  password.current = watch('password', '');

  const handleRegister = (data) => {
    toast.promise(axios.post('/create_user', data), {
      loading: 'Loading',
      success: () => {
        history.push('/login', state);
        return 'Berhasil mendaftarkan akun';
      },
      error: (error) => error.response.data.message,
    });
  };

  return (
    <div className='min-h-screen flex md:flex-row flex-col w-full bg-dark-400 font-primary py-16'>
      <div className='md:w-1/2 w-full flex md:flex-row flex-col justify-center items-center'>
        <p className='text-4xl font-bold text-white md:hidden block text-center w-full'>
          Daftar Sekarang!
        </p>
        <div className='w-9/12'>
          <img
            src={`${process.env.PUBLIC_URL}/images/auth/register-left.png`}
            alt='login'
            className='w-full'
          />
        </div>
      </div>
      <div className='md:w-1/2 w-full'>
        <div className='flex flex-col justify-center md:items-start items-center h-full'>
          <div className='w-4/5'>
            <p className='text-5xl font-bold text-white md:block hidden text-center w-full'>
              Daftar Sekarang!
            </p>
            <FormProvider {...methods}>
              <form
                className='space-y-6 mt-16'
                onSubmit={handleSubmit(handleRegister)}
              >
                <Input
                  label='Nama Lengkap'
                  id='name'
                  validation={{
                    required: 'Nama Lengkap tidak boleh kosong',
                    minLength: {
                      value: 6,
                      message: 'Nama harus memiliki setidaknya 6 karakter',
                    },
                    maxLength: {
                      value: 128,
                      message: 'Nama dapat memiliki maksimal 128 karakter',
                    },
                  }}
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
                  id='no_telp'
                  placeholder='+6285123456'
                  validation={{
                    required: 'Nomor Telepon tidak boleh kosong',
                    pattern: {
                      value: /^\+628[1-9][0-9]{7,11}$/,
                      message:
                        'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
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

                <PasswordInput
                  label='Konfirmasi Password'
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
                  <SubmitButton className='mt-16' loading={false}>
                    Masuk
                  </SubmitButton>
                </div>
              </form>
            </FormProvider>
          </div>
          <div className='w-full mt-16'>
            <hr className='bg-white w-full' />
            <p className='text-white text-center py-2'>
              Telah memiliki akun?{' '}
              <span style={{ color: '#F15412' }}>
                <UnstyledLink href='/login' className='hover:text-yellow-500'>
                  Login
                </UnstyledLink>
              </span>
            </p>
            <hr className='bg-white w-full' />
          </div>
        </div>
      </div>
    </div>
  );
}
