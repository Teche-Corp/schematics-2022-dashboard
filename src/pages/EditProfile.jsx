import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DashboardShell from '@/layout/DashboardShell';
import StandAloneInput from '@/components/StandAloneInput';

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditProfile = (data) => {
    const fetchedData = {
      email: data.email,
      name: data.email,
    };

    console.log(fetchedData);
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
              <h1 className='text-3xl font-extrabold text-gray-700'>
                Edit Profile
              </h1>
            </div>
            <div className='px-4 sm:px-6 md:px-0'>
              <div className='py-6'>
                {/* Description list with inline editing */}
                <div className='mt-10 divide-y divide-gray-200'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Profile
                    </h3>
                    <p className='max-w-2xl text-sm text-gray-500'>
                      This information will be displayed publicly so be careful
                      what you share.
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
                            Name
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='name'
                                placeholder='Chelsea Hagon'
                                validation={{
                                  required: 'Full name is required',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>Chelsea Hagon</span>
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
                                id='email'
                                type='email'
                                placeholder='chelsea.hagon@example.com'
                                validation={{
                                  required: 'Email is required',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                chelsea.hagon@example.com
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Phone Number
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='phone-number'
                                placeholder='+628123456789'
                                validation={{
                                  required: 'Phone number is required',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>+628123456789</span>
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
                              className='px-4 py-2 text-sm font-medium bg-white border rounded-md shadow-sm border-300 text-cyan-900 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                            >
                              Cancel
                            </button>
                            <button
                              type='submit'
                              className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <button
                            type='button'
                            onClick={handleEditClick}
                            className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
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
