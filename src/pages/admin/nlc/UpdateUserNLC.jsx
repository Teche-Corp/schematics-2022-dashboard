import { useState, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useAuthState } from '@/contexts/AuthContext';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';

import { bearerToken, classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';
import axios from 'axios';

export default function UpdateUserNLC(props) {
  const [isEditing, setIsEditing] = useState(false);
  const isLoading = useLoadingToast();

  const { page } = props.location.state;

  const [team, setTeam] = useState([]);

  const getTeamData = async () => {
    const res = await axios.get(`/admin/list/tim/nlc?page=${page}`, {
      headers: { ...bearerToken() },
    });

    setTeam(res.data?.data?.teams);
  };

  useEffect(() => {
    getTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const methods = useForm();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = methods;

  const { user } = useAuthState();

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  let { id } = useParams();

  const getDatabyID = team.find((data) => {
    return String(data.team_id) === id;
  });

  // const paymentMethod = [
  //   { text: 'QRIS', value: 0 },
  //   { text: 'Mandiri', value: 1 },
  // ];

  // useEffect(() => {
  //   const value = paymentMethod.find(
  //     (method) => method.text === getDatabyID['payment-method'],
  //   ).value;
  //   setValue('payment-method', value.toString(), {
  //     shouldValidate: true,
  //   });
  // }, []);

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  useEffect(() => {
    if (cities !== undefined) {
      const city = cities.find(
        (city) => city?.regency_name === getDatabyID?.kota,
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
      setValue('region', city?.region_name, {
        shouldValidate: true,
      });
    }
  }, [cities, getDatabyID?.kota, setValue]);

  useEffect(() => {
    if (cityValue !== undefined) {
      const id = cityValue?.value;
      const city = cities.find((city) => city.id === id);
      if (city?.regency_name !== getDatabyID?.kota) {
        setValue('province', city?.province_name, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('region', city?.region_name, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue, cities, setValue]);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditProfile = (data) => {
    const formData = new FormData();

    const newBody = {
      kota_id: data.city.value,
      ketua_nisn: data['leader-nisn'],
      ketua_alamat: data['leader-address'],
      ketua_id_line: data['leader-line'],
      status_id: 2,
      team_name: data['team-name'],
      team_password: `schnlc${user.name}`,
      team_institusi: data['school-name'],
      'payment-method': data['payment-method'] === 0 ? 'QRIS' : 'Mandiri',
      'account-id': data['account-id'],
      'anggota[0][name]': data['member-name'],
      'anggota[0][email]': data['member-email'],
      'anggota[0][nisn]': data['member-nisn'],
      'anggota[0][phone]': data['member-phone'],
      'anggota[0][alamat]': data['member-address'],
      'anggota[0][id_line]': data['member-line'],
    };

    for (let key in newBody) {
      formData.append(key, newBody[key]);
    }
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
                onSubmit={handleSubmit(handleEditProfile)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                      <span className='block xl:inline'>Edit Tim</span>{' '}
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
                          defaultValue={getDatabyID?.team_name}
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
                          defaultValue={getDatabyID?.sekolah}
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
                          defaultValue={getDatabyID?.anggota?.nama}
                          readOnly={!isEditing}
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader-email'
                          type='email'
                          defaultValue={getDatabyID?.anggota?.email}
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
                          defaultValue={getDatabyID?.anggota?.nisn}
                          readOnly={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='leader-phone'
                          type='text'
                          helperText='Nomor Telepon diawali +62'
                          defaultValue={getDatabyID?.anggota?.phone_number}
                          readOnly={!isEditing}
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
                          defaultValue={getDatabyID?.anggota?.id_line}
                          readOnly={!isEditing}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='leader-address'
                          type='text'
                          defaultValue={getDatabyID?.anggota?.alamat}
                          readOnly={!isEditing}
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Data Anggota
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='member-name'
                          type='text'
                          defaultValue={getDatabyID?.anggota2.nama}
                          readOnly={!isEditing}
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member-email'
                          type='email'
                          defaultValue={getDatabyID.anggota2.email}
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
                          id='member-nisn'
                          type='text'
                          defaultValue={getDatabyID.anggota2.nisn}
                          readOnly={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='member-phone'
                          type='text'
                          defaultValue={getDatabyID.anggota2.phone_number}
                          readOnly={!isEditing}
                          placeholder='+6281234567890'
                          helperText='Nomor Telepon diawali +62'
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
                          id='member-line'
                          type='text'
                          defaultValue={getDatabyID.anggota2.id_line}
                          readOnly={!isEditing}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='member-address'
                          type='text'
                          defaultValue={getDatabyID.anggota2.alamat}
                          readOnly={!isEditing}
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className='pt-8'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                      Upload Bukti Pembayaran
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        {/* <SelectInput
                          label='Metode Pembayaran'
                          id='payment-method'
                          placeholder='Pilih metode pembayaran'
                          defaultValue={
                            paymentMethod?.find(
                              (method) =>
                                method.text === getDatabyID['payment-method'],
                            ).value
                          }
                          options={paymentMethod}
                          disabled={!isEditing}
                          validation={{
                            required: 'Metode Pembayaran tidak boleh kosong',
                          }}
                        /> */}
                      </div>

                      {/* <div className='sm:col-span-4'>
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
                            'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400',
                            isLoading && 'filter brightness-90 cursor-wait',
                            !isDirty
                              ? 'cursor-not-allowed bg-gray-400'
                              : 'bg-nlc hover:bg-nlc-400',
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
    </DashboardShell>
  );
}

// eslint-disable-next-line no-unused-vars
const dummyData = [
  {
    id: 1,
    region: 'Jawa Barat',
    namaTim: 'Doa Ibu',
    verified: 'Yes',
    sekolah: 'SMAN 3 BEKASI',
    kota: 'KOTA BEKASI',
    provinsi: 'Jawa Barat',
    'payment-method': 'Mandiri',
    'account-id': 11223344,
    anggota: {
      nama: 'Rizqi Tsani',
      email: 'tsani@mail.com',
      phone_number: '0813837162',
      id_line: 'tsaniii',
      nisn: '1111',
      alamat: 'Jalan Raya No 1',
    },
    anggota2: {
      nama: 'Agus Budi',
      email: 'budi@mail.com',
      phone_number: '0813837162',
      id_line: 'budii',
      nisn: '1122',
      alamat: 'Jalan Raya No 2',
    },
  },
  {
    id: 2,
    region: 'Jawa Timur',
    namaTim: 'TEAM OP',
    verified: 'No',
    sekolah: 'SMAN 3 Surabaya',
    kota: 'KOTA SURABAYA',
    provinsi: 'Jawa Timur',
    'payment-method': 'QRIS',
    'account-id': 99887766,
    anggota: {
      nama: 'Bobu Tsani',
      email: 'bobu@mail.com',
      phone_number: '0813837162',
      id_line: 'bobuii',
      nisn: '2211',
      alamat: 'Jalan Raya No 3',
    },
    anggota2: {
      nama: 'Bibu Budi',
      email: 'bibu@mail.com',
      phone_number: '0813837162',
      id_line: 'bibui',
      nisn: '2222',
      alamat: 'Jalan Raya No 4',
    },
  },
];
