import { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useSWR from 'swr';

import { useAuthDispatch, useAuthState } from '@/contexts/AuthContext';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';
import DragnDropInput from '@/components/DragnDropInput';
import NormalCheckboxInput from '@/components/NormalCheckboxInput';
import CreateTeamAlert from '@/components/Alert/CreateTeamAlert';

import { bearerToken, classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';
import useTeamId from '@/hooks/useTeamId';

export default function CreateTeam() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const history = useHistory();
  const isLoading = useLoadingToast();

  const methods = useForm();
  const { control, getValues, handleSubmit, setValue, watch } = methods;

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  const cityValue = useWatch({
    control,
    name: 'city',
  });
  const no_anggota_1 = watch('no_anggota_1');

  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const teamId = useTeamId('nlc');

  if (teamId) {
    history.push('/my/sch-nlc/team');
  }

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

  const handleCreateTeam = async (data) => {
    const formData = new FormData();

    const anggota = {
      'anggota[0][name]': data?.['member-name'] || undefined,
      'anggota[0][email]': data?.['member-email'] || undefined,
      'anggota[0][nisn]': data?.['member-nisn'] || undefined,
      'anggota[0][phone]': data?.['member-phone'] || undefined,
      'anggota[0][alamat]': data?.['member-address'] || undefined,
      'anggota[0][id_line]': data?.['member-line'] || undefined,
      'anggota[0][kp_anggota]': data?.['member-id']?.[0] || undefined,
    };

    const newBody = {
      kota_id: data.city.value,
      ketua_nisn: data['leader-nisn'],
      ketua_alamat: data['leader-address'],
      ketua_id_line: data['leader-line'],
      status_id: 0,
      team_name: data['team-name'],
      team_password: `schnlc${user.name}`,
      team_institusi: data['school-name'],
      kp_ketua: data['leader-id'][0],
      ...(!no_anggota_1 && anggota),
    };

    for (let key in newBody) {
      formData.append(key, newBody[key]);
    }

    toast.promise(
      axios
        .post('/nlc/team/create', formData, {
          headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          dispatch('ASSIGN_NLC', res.data.data);
          history.push('/my/sch-nlc/team');
        }),
      {
        loading: 'Loading...',
        success: 'Berhasil membuat tim!',
        error: (err) => err.response.data.msg,
      },
    );
  };

  const onSubmit = (data) => {
    setIsAlertOpen(true);
    setFormData(data);
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
        <CreateTeamAlert
          action={handleCreateTeam}
          data={formData}
          isLoading={isLoading}
          open={isAlertOpen}
          setOpen={setIsAlertOpen}
        />
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <FormProvider {...methods}>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                      <span className='block xl:inline'>Buat Tim</span>{' '}
                      <span className='block text-nlc xl:inline'>
                        Schematics NLC
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
                          helperText='Isi dengan nama lengkap'
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
                          label='NISN'
                          id='leader-nisn'
                          type='text'
                          validation={{
                            required: 'NISN tidak boleh kosong',
                            pattern: {
                              value: /^[0-9]*$/,
                              message: 'Harus berupa angka',
                            },
                          }}
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
                              value: /^\+628[1-9][0-9]{7,11}$/,
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
                          label='Alamat'
                          id='leader-address'
                          type='text'
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <DragnDropInput
                          label='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif'
                          id='leader-id'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='Pastikan nama lengkap di KTP/surat keterangan sesuai dengan nama lengkap yang anda masukkan. File dalam format jpg, png, atau jpeg.'
                          maxFiles={1}
                          validation={{
                            required: 'Foto Kartu Pelajar tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Data Anggota
                    </h3>

                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-6'>
                        <NormalCheckboxInput
                          id='no_anggota_1'
                          label='Tidak memiliki anggota'
                        />
                      </div>

                      {!no_anggota_1 && (
                        <>
                          <div className='sm:col-span-4'>
                            <LightInput
                              label='Nama'
                              id='member-name'
                              helperText='Isi dengan nama lengkap'
                              type='text'
                              validation={{
                                required: 'Nama tidak boleh kosong',
                              }}
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
                                validate: (value) =>
                                  value !== getValues('leader-email') ||
                                  'Email tidak boleh sama dengan email ketua tim',
                              }}
                            />
                          </div>
                          <div className='sm:col-span-3'>
                            <LightInput
                              label='NISN'
                              id='member-nisn'
                              type='text'
                              validation={{
                                required: 'NISN tidak boleh kosong',
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message: 'Harus berupa angka',
                                },
                              }}
                            />
                          </div>
                          <div className='sm:col-span-4'>
                            <LightInput
                              label='Nomor Telepon'
                              id='member-phone'
                              type='text'
                              placeholder='+6281234567890'
                              helperText='Nomor Telepon diawali +62'
                              validation={{
                                required: 'Nomor Telepon tidak boleh kosong',
                                pattern: {
                                  value: /^\+628[1-9][0-9]{7,11}$/,
                                  message:
                                    'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
                                },
                              }}
                            />
                          </div>
                          <div className='sm:col-span-2'>
                            <LightInput
                              label='ID Line (Opsional)'
                              id='member-line'
                              type='text'
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
                            <DragnDropInput
                              label='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif'
                              id='member-id'
                              accept='image/png, image/jpg, image/jpeg'
                              helperText='Pastikan nama lengkap di KTP/surat keterangan sesuai dengan nama lengkap yang anda masukkan. File dalam format jpg, png, atau jpeg.'
                              maxFiles={1}
                              validation={{
                                required:
                                  'Foto Kartu Pelajar tidak boleh kosong',
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-end'>
                    <Link
                      to='/my/sch-nlc/team'
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                    >
                      Kembali
                    </Link>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={classNames(
                        'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400',
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
