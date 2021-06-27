import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DashboardShell from '@/layout/DashboardShell';
import StandAloneInput from '@/components/StandAloneInput';

import { useParams } from 'react-router-dom';

export default function UpdateUserNLC() {
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

  let { id } = useParams();

  const getDatabyID = dummyData.find((data) => data.id === Number(id));

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            <div className='px-4 sm:px-6 md:px-0'>
              <h1 className='text-3xl font-extrabold text-gray-900'>
                Edit Profile
              </h1>
            </div>
            <div className='px-4 sm:px-6 md:px-0'>
              <div className='py-6'>
                <div className='mt-10 divide-y divide-gray-200'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Profile Ketua
                    </h3>
                    <p className='max-w-2xl text-sm text-gray-500'>
                      Informasi team NLC{' '}
                      <span className='text-nlc-400'>
                        {getDatabyID.namaTim}
                      </span>
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
                                id='name'
                                placeholder={getDatabyID.anggota.nama}
                                validation={{
                                  required: 'Nama harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.nama}
                              </span>
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
                                placeholder={getDatabyID.anggota.email}
                                validation={{
                                  required: 'Email harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            ID Line
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='id_line'
                                placeholder={getDatabyID.anggota.id_line}
                                validation={{
                                  required: 'ID Line harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.id_line}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Nomor Telpon
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='phone_number'
                                placeholder={getDatabyID.anggota.phone_number}
                                validation={{
                                  required: 'Nomor telpon harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.phone_number}
                              </span>
                            )}
                          </div>
                        </div>
                      </dl>
                      <div className='my-3 space-y-1'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900 '>
                          Profile Anggota 1
                        </h3>
                        <p className='max-w-2xl text-sm text-gray-500'>
                          Informasi team NLC{' '}
                          <span className='text-nlc-400'>
                            {getDatabyID.namaTim}
                          </span>
                        </p>
                      </div>
                      <dl className='divide-y divide-gray-200'>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Nama
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='name'
                                placeholder={getDatabyID.anggota2.nama}
                                validation={{
                                  required: 'Nama harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.nama}
                              </span>
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
                                placeholder={getDatabyID.anggota2.email}
                                validation={{
                                  required: 'Email harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            ID Line
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='id_line'
                                placeholder={getDatabyID.anggota2.id_line}
                                validation={{
                                  required: 'ID Line harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.id_line}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Nomor Telpon
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='phone-number'
                                placeholder={getDatabyID.anggota2.phone_number}
                                validation={{
                                  required: 'Nomor Telpon harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.phone_number}
                              </span>
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
                              Cancel
                            </button>
                            <button
                              type='submit'
                              className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-100 bg-dark-600 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100'
                            >
                              Save
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

const dummyData = [
  {
    id: 1,
    region: 'Jawa Barat',
    namaTim: 'Doa Ibu',
    verified: 'Yes',
    sekolah: 'SMAN 3 BEKASI',
    kota: 'BEKASI',
    provinsi: 'Jawa Barat',
    anggota: {
      nama: 'Rizqi Tsani',
      email: 'tsani@mail.com',
      phone_number: '0813837162',
      id_line: 'tsaniii',
    },
    anggota2: {
      nama: 'Agus Budi',
      email: 'budi@mail.com',
      phone_number: '0813837162',
      id_line: 'budii',
    },
  },
  {
    id: 2,
    region: 'Jawa Timur',
    namaTim: 'TEAM OP',
    verified: 'No',
    sekolah: 'SMAN 3 Surabaya',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    anggota: {
      nama: 'Bobu Tsani',
      email: 'bobu@mail.com',
      phone_number: '0813837162',
      id_line: 'bobuii',
    },
    anggota2: {
      nama: 'Bibu Budi',
      email: 'bibu@mail.com',
      phone_number: '0813837162',
      id_line: 'bibui',
    },
  },
];
