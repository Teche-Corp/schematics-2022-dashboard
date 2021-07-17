import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuthDispatch, useAuthState } from '@/contexts/AuthContext';

import DashboardShell from '@/layout/DashboardShell';
import StandAloneInput from '@/components/StandAloneInput';

import { bearerToken, classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';

export default function EditProfile() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const isLoading = useLoadingToast();

  const methods = useForm();
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditProfile = async (data) => {
    const loadingToast = toast.loading('loading...');
    try {
      const res = await axios.put('/user/edit', data, {
        headers: { ...bearerToken() },
        withCredentials:
          process.env.NODE_ENV === 'production' &&
          process.env.PUBLIC_URL === '/dashboard'
            ? true
            : false,
      });
      const { jwt: token } = res.data.data;
      localStorage.setItem('token', token);

      const user = await axios.post(
        '/user/get-user-info',
        {},
        { headers: { ...bearerToken() } },
      );

      dispatch('EDIT_PROFILE', { ...user.data.data, token });
      toast.success('Profil berhasil diubah.', { id: loadingToast });
    } catch (err) {
      toast.error(err.response.data.msg, { id: loadingToast });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            <div className='px-4 sm:px-6 md:px-0'>
              <h1 className='text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl'>
                Edit Profil
              </h1>
            </div>
            <div className='px-4 sm:px-6 md:px-0'>
              <div className='py-6'>
                {/* Description list with inline editing */}
                <div className='mt-8 divide-y divide-gray-200'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Profil
                    </h3>
                    <p className='max-w-2xl text-sm text-gray-500'>
                      Data profil Anda akan digunakan saat membuat tim.
                    </p>
                  </div>
                  <FormProvider {...methods}>
                    <form
                      className='mt-6'
                      onSubmit={handleSubmit(handleEditProfile)}
                    >
                      <dl className='divide-y divide-gray-200'>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Nama
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                label='Nama'
                                id='name'
                                defaultValue={user.name}
                                validation={{
                                  required: 'Nama tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>{user.name}</span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Email
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                label='Email'
                                id='email'
                                type='email'
                                defaultValue={user.email}
                                validation={{
                                  required: 'Email tidak boleh kosong',
                                  pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Email tidak valid',
                                  },
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>{user.email}</span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Nomor Telepon
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                label='Nomor Telepon'
                                id='phone'
                                defaultValue='+628123456789'
                                validation={{
                                  required: 'Nomor Telepon tidak boleh kosong',
                                  pattern: {
                                    value: /^\+628[1-9][0-9]{7,11}$/,
                                    message:
                                      'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
                                  },
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>{user.phone}</span>
                            )}
                          </div>
                        </div>
                      </dl>
                      <div className='flex justify-end pt-8'>
                        {isEditing ? (
                          <>
                            <button
                              type='button'
                              onClick={handleEditClick}
                              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm border-300 text-dark-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                            >
                              Batal
                            </button>
                            <button
                              type='submit'
                              disabled={isLoading || !isDirty}
                              className={classNames(
                                'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100',
                                isLoading && 'filter brightness-90 cursor-wait',
                                !isDirty
                                  ? 'cursor-not-allowed bg-gray-400'
                                  : 'bg-dark-100 hover:bg-dark-400',
                              )}
                            >
                              Simpan
                            </button>
                          </>
                        ) : (
                          <button
                            type='button'
                            onClick={handleEditClick}
                            className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-100 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100'
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
