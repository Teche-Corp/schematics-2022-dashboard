import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from '@/components/SubmitButton';
import UnstyledLink from '@/components/UnstyledLink';
import { useAuthDispatch } from '@/contexts/AuthContext';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

export default function Login() {
  const dispatch = useAuthDispatch();
  const { state } = useLocation();
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit } = methods;

  const handleLogin = (data) => {
    toast.promise(
      axios
        .post('/login_user', data)
        .then((res) => {
          const { token } = res.data.data;
          localStorage.setItem('token', token);
          return axios.get('/me', { headers: { ...bearerToken() } });
        })
        .then((res) => {
          dispatch('LOGIN', res.data.data);
        }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/landing', state);
          return 'Berhasil masuk ke akun anda';
        },
        error: (err) => err,
      },
    );
  };

  return (
    <div className='min-h-screen flex md:flex-row flex-col w-full bg-dark-400 font-primary py-16'>
      <div className='md:w-1/2 w-full flex md:flex-row flex-col justify-center items-center'>
        <p className='text-4xl font-bold text-white md:hidden block text-center w-full'>
          Selamat Datang
        </p>
        <div className='w-9/12'>
          <img
            src={`${process.env.PUBLIC_URL}/images/auth/login-left.png`}
            alt='login'
            className='w-full'
          />
        </div>
      </div>
      <div className='md:w-1/2 w-full'>
        <div className='flex flex-col justify-center md:items-start items-center h-full'>
          <div className='w-4/5'>
            <p className='text-5xl font-bold text-white md:block hidden text-center w-full'>
              Selamat Datang
            </p>
            <FormProvider {...methods}>
              <form
                className='space-y-6 mt-16'
                onSubmit={handleSubmit(handleLogin)}
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
                {/* <div className='w-full'>
                  <div className='text-sm'>
                    <UnstyledLink
                      href='/forgot'
                      className='font-medium text-light-100 hover:text-gray-400'
                    >
                      Lupa password?
                    </UnstyledLink>
                  </div>
                </div> */}
                <div>
                  <SubmitButton loading={false}>Masuk</SubmitButton>
                </div>
              </form>
            </FormProvider>
            <br />
            <hr className='bg-white w-full' />
            <p className='text-white text-center py-2'>
              Belum memiliki akun?{' '}
              <span style={{ color: '#F15412' }}>
                <UnstyledLink
                  href='/register'
                  className='hover:text-yellow-500'
                >
                  Daftar
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
