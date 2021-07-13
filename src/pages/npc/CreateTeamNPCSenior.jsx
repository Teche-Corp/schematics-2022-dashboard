import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useSWR from 'swr';

import { useAuthDispatch, useAuthState } from '@/contexts/AuthContext';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';
import DragnDropInput from '@/components/DragnDropInput';

import { bearerToken, classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';

export default function CreateTeamNPCSenior() {
  const history = useHistory();
  const isLoading = useLoadingToast();

  const methods = useForm();
  const { control, handleSubmit, setValue } = methods;

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

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
    const formData = new FormData();

    const newBody = {
      kota_id: data.city.value,
      ketua_nim: data['leader-nim'],
      ketua_alamat: data['leader-address'],
      ketua_id_line: data['leader-line'],
      team_name: data['team-name'],
      team_password: `schnpc{user.name}`,
      team_institusi: data['university-name'],
      kp_ketua: data['leader-student-id'][0],
      anggota: [
        {
          name: data['member1-name'],
          email: data['member1-email'],
          nim: data['member1-nim'],
          phone: data['member1-phone'],
          alamat: data['member1-address'],
          id_line: data['member1-line'],
          kp_anggota: data['member1-student-id'][0],
        },
        {
          name: data['member2-name'],
          email: data['member2-email'],
          nim: data['member2-nim'],
          phone: data['member2-phone'],
          alamat: data['member2-address'],
          id_line: data['member2-line'],
          kp_anggota: data['member2-student-id'][0],
        },
      ],
    };

    for (let key in newBody) {
      formData.append(key, newBody[key]);
    }

    toast.promise(
      axios
        .post('/npc/team/create', formData, {
          headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          dispatch('ASSIGN_NPC', res.data.data);
          history.push('/my/sch-npc/team');
        }),
      {
        loading: 'Loading...',
        success: 'Berhasil membuat tim!',
        error: (err) => err.response.data.msg,
      },
    );
  };

  if (fetchError) {
    return toast.error('Gagal mengambil data kota.');
  }

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
                      <span className='block text-red-400 xl:inline'>
                        Schematics NPC Senior
                      </span>
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
                          label='Asal Universitas'
                          id='university-name'
                          type='text'
                          validation={{
                            required: 'Asal Universitas tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <SelectCity
                          cities={cities || []}
                          validation={{ required: 'Kota tidak boleh kosong' }}
                          disabled={!cities}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Provinsi'
                          id='province'
                          type='text'
                          readOnly
                          validation={{
                            required: 'Provinsi tidak boleh kosong',
                          }}
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
                          defaultValue={user.name}
                          readOnly
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader-email'
                          type='email'
                          defaultValue={user.email}
                          readOnly
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
                          label='NIM'
                          id='leader-nim'
                          type='text'
                          validation={{ required: 'NIM tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='leader-phone'
                          type='text'
                          helperText='Nomor Telepon diawali +62'
                          defaultValue={user.phone}
                          readOnly
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
                          label='ID Line (Opsional)'
                          id='leader-line'
                          type='text'
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Address'
                          id='leader-address'
                          type='text'
                          validation={{ required: 'Alamat tidak boleh kosong' }}
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
                      Data Anggota 1
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='member1-name'
                          type='text'
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member1-email'
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
                          label='NIM'
                          id='member1-nim'
                          type='text'
                          validation={{ required: 'NIM tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='member1-phone'
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
                          label='ID Line (Opsional)'
                          id='member1-line'
                          type='text'
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='member1-address'
                          type='text'
                          validation={{ required: 'Alamat tidak boleh kosong' }}
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
                      Data Anggota 2
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='member2-name'
                          type='text'
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member2-email'
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
                          label='NIM'
                          id='member2-nim'
                          type='text'
                          validation={{ required: 'NIM is required' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='member2-phone'
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
                          label='ID Line (Opsional)'
                          id='member2-line'
                          type='text'
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='member2-address'
                          type='text'
                          validation={{ required: 'Alamat tidak boleh kosong' }}
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
                      Kembali
                    </Link>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={classNames(
                        'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-npc-400 hover:bg-npc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-400',
                        isLoading && 'filter brightness-90 cursor-wait',
                      )}
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
