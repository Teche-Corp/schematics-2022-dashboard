import { useEffect, useState } from 'react';
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
  const { control, handleSubmit, setValue } = methods;

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const teamId = useTeamId('npc');

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

    const newBody = {
      kota_id: data.city.value,
      ketua_nisn: data['leader-nisn'],
      ketua_alamat: data['leader-address'],
      ketua_id_line: data['leader-line'],
      ketua_id_facebook: data['leader-discord'],
      team_name: data['team-name'],
      team_password: `schnpc${user.name}`,
      team_institusi: data['school-name'],
      kp_ketua: data['leader-id'][0],
      event: 'npc_junior',
      status_id: 0,
    };

    for (let key in newBody) {
      formData.append(key, newBody[key]);
    }

    toast.promise(
      axios
        .post('/npc/team/junior', formData, {
          headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          dispatch('ASSIGN_NPC_JUNIOR', res.data.data.team_id);
          history.push('/my/sch-npc/team');
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
                      <span className='block text-npc-400 xl:inline'>
                        Schematics NPC Junior
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
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Username Discord'
                          id='leader-discord'
                          type='text'
                          helperText='Username dapat dilihat di bagian profil akun. Contoh: Schematics#2021'
                          validation={{
                            required: 'Username Discord tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
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

                      <div className='sm:col-span-3'>
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
