import { useState, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useAuthDispatch } from '@/contexts/AuthContext';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';
import SelectInput from '@/components/SelectInput';
import CheckboxInput from '@/components/CheckboxInput';

import { bearerToken, classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';

export default function UpdateUserNpcJunior() {
  const [isEditing, setIsEditing] = useState(false);
  const isLoading = useLoadingToast();
  const [teamData, setTeamData] = useState(undefined);

  const methods = useForm();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(teamData);
  }, [reset, teamData]);

  const dispatch = useAuthDispatch();

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  let { id } = useParams();

  const paymentMethod = [
    { text: 'QRIS', value: 0 },
    { text: 'Mandiri', value: 1 },
  ];

  const handleSetTeamData = () => {
    axios
      .post(
        '/admin/detail_tim',
        { team_id: id },
        { headers: { ...bearerToken() } },
      )
      .then((res) => {
        setTeamData(res.data.data);
      });
  };

  useEffect(() => {
    handleSetTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (teamData !== undefined) {
      setValue('team-name', teamData?.team_name, { shouldDirty: false });
      setValue('school-name', teamData?.institusi, { shouldDirty: false });
      setValue('leader-name', teamData?.anggota[0]?.nama, {
        shouldDirty: false,
      });
      setValue('leader-email', teamData?.anggota[0]?.email, {
        shouldDirty: false,
      });
      setValue('leader-nisn', teamData?.anggota[0]?.nisn, {
        shouldDirty: false,
      });
      setValue('leader-phone', teamData?.anggota[0]?.nomor_telepon, {
        shouldDirty: false,
      });
      setValue('leader-line', teamData?.anggota[0]?.id_line, {
        shouldDirty: false,
      });
      setValue('leader-discord', teamData?.anggota[0]?.id_facebook, {
        shouldDirty: false,
      });
      setValue('leader-address', teamData?.anggota[0]?.alamat, {
        shouldDirty: false,
      });
      setValue('jumlah-bayar', teamData?.bukti_pembayaran?.jumlah, {
        shouldDirty: false,
      });
      setValue('verified', teamData?.bukti_pembayaran?.verified, {
        shouldDirty: false,
      });
      setValue(
        'payment-method',
        teamData?.bukti_pembayaran?.sumber === 'Mandiri' ? '1' : '0',
        {
          shouldDirty: false,
        },
      );
    }
  }, [teamData, setValue]);

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  useEffect(() => {
    if (cities !== undefined && teamData !== undefined) {
      const city = cities.find(
        (city) => city.regency_name === teamData.kota.regency_name,
      );
      setValue(
        'city',
        { value: city?.id, label: city?.regency_name },
        {
          shouldValidate: true,
        },
      );
      setValue('province', city?.province_name, {
        shouldValidate: true,
      });
    }
  }, [cities, teamData, setValue]);

  useEffect(() => {
    if (cityValue !== undefined && teamData !== undefined) {
      const id = cityValue?.value;
      const city = cities.find((city) => city.id === id);
      if (teamData.kota.regency_name !== city?.regency_name) {
        setValue('province', city?.province_name, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [cityValue, cities, teamData, setValue]);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditUserNpcJunior = (data) => {
    const newBody = {
      team_id: Number(id),
      kota_id: data.city.value,
      nama_team: data['team-name'],
      institusi: data['school-name'],
      ketua_anggota_id: teamData.anggota[0].anggota_id,
      nama_ketua: data['leader-name'],
      email_ketua: data['leader-email'],
      telp_ketua: data['leader-phone'],
      nisn_ketua: data['leader-nisn'],
      alamat_ketua: data['leader-address'],
      line_ketua: data['leader-line'],
      facebook_ketua: data['leader-discord'],
      sumber_bayar: data['payment-method'] === '0' ? 'QRIS' : 'Mandiri',
      verified_bayar: data['verified'],
      anggota: [],
    };

    toast.promise(
      axios
        .post('/admin/update_tim', newBody, {
          headers: { ...bearerToken() },
        })
        .then((res) => {
          dispatch('ASSIGN_NPC_JUNIOR', res.data.data.team_id);
        })
        .then(() => handleSetTeamData())
        .finally(() => setIsEditing(false)),
      {
        loading: 'Loading...',
        success: 'Tim berhasil diperbarui',
        error: (err) => err.response.data.msg,
      },
    );
  };

  if (fetchError) {
    return toast.error('Gagal mengambil data kota.');
  }

  return (
    <DashboardAdminShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <FormProvider {...methods}>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit(handleEditUserNpcJunior)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <div className='flex items-center mb-6 '>
                      <Link to='/admin/event/sch-npc/junior/user'>
                        <HiOutlineArrowCircleLeft className='w-6 h-6' />
                      </Link>
                      <h1 className='ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                        <span className='block xl:inline'>
                          {isEditing ? 'Edit Tim' : 'Detail Tim'}
                        </span>{' '}
                        <span className='block text-npc-400 xl:inline'>
                          Schematics NPC Junior
                        </span>
                      </h1>
                    </div>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama Tim'
                          id='team-name'
                          type='text'
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
                          validation={{
                            required: 'Asal Sekolah tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <SelectCity
                          cities={cities || []}
                          validation={{ required: 'Kota tidak boleh kosong' }}
                          disabled={!cities || !isEditing}
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
                          type='text'
                          readOnly={!isEditing}
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader-email'
                          type='email'
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='ID Discord'
                          id='leader-discord'
                          type='text'
                          readOnly={!isEditing}
                          validation={{
                            required: 'ID Discord tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Nomor Telepon'
                          id='leader-phone'
                          type='text'
                          helperText='Nomor Telepon diawali +62'
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='leader-address'
                          type='text'
                          readOnly={!isEditing}
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>

                      {teamData && (
                        <div className='col-span-full'>
                          <label
                            htmlFor={teamData?.anggota[0]?.url}
                            className='block text-sm font-normal text-gray-700'
                          >
                            Foto Kartu Pelajar/Surat Keterangan Siswa Aktif
                          </label>
                          <div className='relative mt-1'>
                            <img
                              src={teamData?.anggota[0]?.url}
                              alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Anggota'
                              className='max-h-80'
                              id={teamData?.anggota[0]?.url}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Upload Bukti Pembayaran
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      {teamData?.bukti_pembayaran && (
                        <div className='sm:col-span-3'>
                          <LightInput
                            label='Jumlah Bayar'
                            id='jumlah-bayar'
                            type='text'
                            readOnly={true}
                            validation={{
                              required: 'Jumlah Bayar tidak boleh kosong',
                            }}
                          />
                        </div>
                      )}

                      {teamData?.bukti_pembayaran && (
                        <div className='sm:col-span-4'>
                          <SelectInput
                            label='Metode Pembayaran'
                            id='payment-method'
                            placeholder='Pilih metode pembayaran'
                            options={paymentMethod}
                            disabled={!isEditing}
                            validation={{
                              required: 'Metode Pembayaran tidak boleh kosong',
                            }}
                          />
                        </div>
                      )}

                      {/* <div className='sm:col-span-4'
                        <LightInput
                          label='Nomor Rekening'
                          id='account-id'
                          type='text'
                          defaultValue={getDatabyID['account-id']}
                          readOnly={!isEditing}
                          validation={{
                            required: 'Nomor Rekening tidak boleh kosong',
                          }}
                        />
                      </div> */}

                      {teamData?.bukti_pembayaran && (
                        <div className='col-span-full'>
                          <label
                            htmlFor={teamData?.bukti_pembayaran?.url}
                            className='block text-sm font-normal text-gray-700'
                          >
                            Bukti Pembayaran
                          </label>
                          <div className='relative mt-1'>
                            <img
                              src={teamData?.bukti_pembayaran?.url}
                              alt='Bukti Pembayaran'
                              className='max-h-80'
                              id={teamData?.bukti_pembayaran?.url}
                            />
                          </div>
                        </div>
                      )}

                      {teamData?.bukti_pembayaran && (
                        <div className='col-auto'>
                          <CheckboxInput
                            label='Verifikasi Bayar'
                            id='verified'
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-end'>
                    {isEditing ? (
                      <>
                        <button
                          type='button'
                          onClick={handleEditClick}
                          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                        >
                          Batal
                        </button>
                        <button
                          type='submit'
                          disabled={isLoading || !isDirty}
                          className={classNames(
                            'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-400',
                            isLoading && 'filter brightness-90 cursor-wait',
                            !isDirty
                              ? 'cursor-not-allowed bg-gray-400'
                              : 'bg-npc hover:bg-npc-400',
                          )}
                        >
                          Simpan
                        </button>
                      </>
                    ) : (
                      <button
                        type='button'
                        onClick={handleEditClick}
                        className={classNames(
                          'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-100 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100',
                          isLoading && 'filter brightness-90 cursor-wait',
                        )}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
