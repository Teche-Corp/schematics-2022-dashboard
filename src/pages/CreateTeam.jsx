import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';

export default function CreateTeam() {
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
                      <span className='block text-nlc xl:inline'>NLC</span>
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
                          label='School Name'
                          id='school-name'
                          type='text'
                          validation={{ required: 'School name is required' }}
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

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Region'
                          id='region'
                          type='text'
                          validation={{ required: 'Region is required' }}
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
                          label='NISN'
                          id='leader-nisn'
                          type='text'
                          validation={{ required: 'NISN is required' }}
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
                              value: /^\+628[1-9][0-9]{6,11}$/,
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
                        <label
                          htmlFor='cover_photo'
                          className='block text-sm font-normal text-gray-700'
                        >
                          Student ID Card
                        </label>
                        <div className='flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md'>
                          <div className='space-y-1 text-center'>
                            <svg
                              className='w-12 h-12 mx-auto text-gray-400'
                              stroke='currentColor'
                              fill='none'
                              viewBox='0 0 48 48'
                              aria-hidden='true'
                            >
                              <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='file-upload'
                                className='relative font-medium bg-white rounded-md cursor-pointer text-nlc hover:text-nlc-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-nlc-400'
                              >
                                <span>Upload a file</span>
                                <input
                                  id='file-upload'
                                  name='file-upload'
                                  type='file'
                                  className='sr-only'
                                />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Team Member Information
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Name'
                          id='member-name'
                          type='text'
                          validation={{ required: 'Name is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member-email'
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
                          label='NISN'
                          id='member-nisn'
                          type='text'
                          validation={{ required: 'NISN is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Phone Number'
                          id='member-phone'
                          type='text'
                          validation={{
                            required: 'Phone Number is required',
                            pattern: {
                              value: /^\+628[1-9][0-9]{6,11}$/,
                              message:
                                'Please fill in phone number starting with +62 and correct format',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='Line ID'
                          id='member-line'
                          type='text'
                          validation={{ required: 'Line ID is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Address'
                          id='member-address'
                          type='text'
                          validation={{ required: 'Address is required' }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <label
                          htmlFor='cover_photo'
                          className='block text-sm font-normal text-gray-700'
                        >
                          Student ID Card
                        </label>
                        <div className='flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md'>
                          <div className='space-y-1 text-center'>
                            <svg
                              className='w-12 h-12 mx-auto text-gray-400'
                              stroke='currentColor'
                              fill='none'
                              viewBox='0 0 48 48'
                              aria-hidden='true'
                            >
                              <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='file-upload'
                                className='relative font-medium bg-white rounded-md cursor-pointer text-nlc hover:text-nlc-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-nlc-400'
                              >
                                <span>Upload a file</span>
                                <input
                                  id='file-upload'
                                  name='file-upload'
                                  type='file'
                                  className='sr-only'
                                />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-end'>
                    <Link
                      to='/sch-nlc'
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400'
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
