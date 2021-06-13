import { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';

export default function CreateTeam() {
  const [cities, setCities] = useState([]);

  const methods = useForm();
  const { control, handleSubmit, setValue } = methods;

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  useEffect(() => {
    const fetchCities = async () => {
      const res = await fetch(
        'http://schematics-webkes-backend-dev.herokuapp.com/api/region/list',
      );
      const data = await res.json();

      setCities(data.data);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (cityValue !== undefined) {
      const id = cityValue?.value;
      const city = cities.find((city) => city.id === id);
      setValue('province', city?.province_name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('region', city?.region_name, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [cityValue, cities, setValue]);

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
                      <span className='block xl:inline'>Buat Tim</span>{' '}
                      <span className='block text-nlc xl:inline'>NLC</span>
                    </h1>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama Tim'
                          id='team-name'
                          type='text'
                          validation={{
                            required: 'Nama Tim tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Asal Sekolah'
                          id='school-name'
                          type='text'
                          validation={{
                            required: 'Asal Sekolah tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <SelectCity
                          cities={cities}
                          validation={{ required: 'Kota tidak boleh kosong' }}
                          disabled={cities.length === 0}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Provinsi'
                          id='province'
                          type='text'
                          validation={{
                            required: 'Provinsi tidak boleh kosong',
                          }}
                          readOnly
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Region'
                          id='region'
                          type='text'
                          validation={{ required: 'Region tidak boleh kosong' }}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Data Ketua Tim
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='leader-name'
                          type='text'
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader-email'
                          type='email'
                          validation={{
                            required: 'Email tidak boleh kosong',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Email tidak valid',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='NISN'
                          id='leader-nisn'
                          type='text'
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='leader-phone'
                          type='text'
                          validation={{
                            required: 'Nomor Telepon tidak boleh kosong',
                            pattern: {
                              value: /^\+628[1-9][0-9]{8,11}$/,
                              message:
                                'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='ID Line'
                          id='leader-line'
                          type='text'
                          validation={{
                            required: 'ID Line tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='leader-address'
                          type='text'
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <label
                          htmlFor='cover_photo'
                          className='block text-sm font-normal text-gray-700'
                        >
                          Foto Kartu Pelajar
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
                      Data Anggota
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='member-name'
                          type='text'
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member-email'
                          type='email'
                          validation={{
                            required: 'Email tidak boleh kosong',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Email tidak valid',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='NISN'
                          id='member-nisn'
                          type='text'
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='member-phone'
                          type='text'
                          validation={{
                            required: 'Nomor Telepon tidak boleh kosong',
                            pattern: {
                              value: /^\+628[1-9][0-9]{8,11}$/,
                              message:
                                'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-2'>
                        <LightInput
                          label='ID Line'
                          id='member-line'
                          type='text'
                          validation={{
                            required: 'ID Line tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='member-address'
                          type='text'
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <label
                          htmlFor='cover_photo'
                          className='block text-sm font-normal text-gray-700'
                        >
                          Foto Kartu Pelajar
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
                      Kembali
                    </Link>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400'
                    >
                      Buat Tim
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
