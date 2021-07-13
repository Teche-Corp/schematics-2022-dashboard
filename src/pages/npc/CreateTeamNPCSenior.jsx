import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import DragnDropInput from '@/components/DragnDropInput';

export default function CreateTeamNPCSenior() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const handleCreateTeam = (data) => {
    console.log(data);
  };

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <FormProvider {...methods}>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit(handleCreateTeam)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                      <span className='block xl:inline'>Create Team</span>{' '}
                      <span className='block text-red-400 xl:inline'>
                        NPC Senior
                      </span>
                    </h1>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Team Name'
                          id='team-name'
                          type='text'
                          validation={{ required: 'Team name is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='University Name'
                          id='university-name'
                          type='text'
                          validation={{
                            required: 'University name is required',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='City'
                          id='city'
                          type='text'
                          validation={{ required: 'City is required' }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Province'
                          id='province'
                          type='text'
                          validation={{ required: 'Province is required' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Team Leader Information
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Name'
                          id='leader-name'
                          type='text'
                          validation={{ required: 'Name is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader-email'
                          type='email'
                          validation={{
                            required: 'Email is required',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please input correct email address',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='NIM'
                          id='leader-nim'
                          type='text'
                          validation={{ required: 'NIM is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Phone Number'
                          id='leader-phone'
                          type='text'
                          validation={{
                            required: 'Phone Number is required',
                            pattern: {
                              value: /^\+628[1-9][0-9]{8,11}$/,
                              message:
                                'Please fill in phone number starting with +62 and correct format',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='Line ID'
                          id='leader-line'
                          type='text'
                          validation={{ required: 'Line ID is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Address'
                          id='leader-address'
                          type='text'
                          validation={{ required: 'Address is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <DragnDropInput
                          label='Foto Kartu Tanda Mahasiswa/Surat Keterangan Mahasiswa Aktif'
                          id='leader-student-id'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='File dalam format jpg, png, atau jpeg'
                          maxFiles={1}
                          validation={{
                            required:
                              'Foto Kartu Tanda Mahasiswa tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Team Member 1 Information
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Name'
                          id='member1-name'
                          type='text'
                          validation={{ required: 'Name is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member1-email'
                          type='email'
                          validation={{
                            required: 'Email is required',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please input correct email address',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='NIM'
                          id='member1-nim'
                          type='text'
                          validation={{ required: 'NIM is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Phone Number'
                          id='member1-phone'
                          type='text'
                          validation={{
                            required: 'Phone Number is required',
                            pattern: {
                              value: /^\+628[1-9][0-9]{8,11}$/,
                              message:
                                'Please fill in phone number starting with +62 and correct format',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='Line ID'
                          id='member1-line'
                          type='text'
                          validation={{ required: 'Line ID is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Address'
                          id='member1-address'
                          type='text'
                          validation={{ required: 'Address is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <DragnDropInput
                          label='Foto Kartu Tanda Mahasiswa/Surat Keterangan Mahasiswa Aktif'
                          id='member1-student-id'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='File dalam format jpg, png, atau jpeg'
                          maxFiles={1}
                          validation={{
                            required:
                              'Foto Kartu Tanda Mahasiswa tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Team Member 2 Information
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Name'
                          id='member2-name'
                          type='text'
                          validation={{ required: 'Name is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member2-email'
                          type='email'
                          validation={{
                            required: 'Email is required',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please input correct email address',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='NIM'
                          id='member2-nim'
                          type='text'
                          validation={{ required: 'NIM is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Phone Number'
                          id='member2-phone'
                          type='text'
                          validation={{
                            required: 'Phone Number is required',
                            pattern: {
                              value: /^\+628[1-9][0-9]{8,11}$/,
                              message:
                                'Please fill in phone number starting with +62 and correct format',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='Line ID'
                          id='member2-line'
                          type='text'
                          validation={{ required: 'Line ID is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Address'
                          id='member2-address'
                          type='text'
                          validation={{ required: 'Address is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <DragnDropInput
                          label='Foto Kartu Tanda Mahasiswa/Surat Keterangan Mahasiswa Aktif'
                          id='member2-student-id'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='File dalam format jpg, png, atau jpeg'
                          maxFiles={1}
                          validation={{
                            required:
                              'Foto Kartu Tanda Mahasiswa tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-end'>
                    <Link
                      to='/my/sch-npc/team'
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-npc-400 hover:bg-npc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-400'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
