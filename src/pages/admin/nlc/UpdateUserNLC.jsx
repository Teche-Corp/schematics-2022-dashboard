import { useState, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useAuthState } from '@/contexts/AuthContext';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';
import StandAloneInput from '@/components/StandAloneInput';
import SelectCity from '@/components/SelectCity';
import DragnDropInput from '@/components/DragnDropInput';

import { classNames } from '@/lib/helper';
import useLoadingToast from '@/hooks/useLoadingToast';

export default function UpdateUserNLC() {
  const [isEditing, setIsEditing] = useState(false);
  const isLoading = useLoadingToast();

  const methods = useForm();
  const { control, handleSubmit, setValue } = methods;

  const { user } = useAuthState();

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;

  let { id } = useParams();
  const getDatabyID = dummyData.find((data) => data.id === Number(id));

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  useEffect(() => {
    if (cities !== undefined) {
      const value = cities.find(
        (city) => city.regency_name === getDatabyID.kota,
      ).id;
      setValue(
        'city',
        { value, label: getDatabyID.kota },
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  }, [cities]);

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

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditProfile = (data) => {
    console.log(data);
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
      kp_ketua: data['leader-id'][0],
      'anggota[0][name]': data['member-name'],
      'anggota[0][email]': data['member-email'],
      'anggota[0][nisn]': data['member-nisn'],
      'anggota[0][phone]': data['member-phone'],
      'anggota[0][alamat]': data['member-address'],
      'anggota[0][id_line]': data['member-line'],
      'anggota[0][kp_anggota]': data['member-id'][0],
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
          <div className='pt-10 pb-16'>
            <div className='px-4 sm:px-6 md:px-0'>
              <h1 className='text-3xl font-extrabold text-gray-900'>
                Edit Tim NLC
              </h1>
            </div>
            <div className='px-4 sm:px-6 md:px-0'>
              <div className='py-6'>
                <div className='mt-10 divide-y divide-gray-200'>
                  <FormProvider {...methods}>
                    <form
                      className='mt-6'
                      onSubmit={handleSubmit(handleEditProfile)}
                    >
                      <div className='space-y-1'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900'>
                          Profil Tim
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
                                id='team-name'
                                defaultValue={getDatabyID.namaTim}
                                validation={{
                                  required: 'Nama harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.namaTim}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Asal Sekolah
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='school-name'
                                defaultValue={getDatabyID.sekolah}
                                validation={{
                                  required: 'Asal sekolah harus diisi',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.sekolah}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='flex items-center text-sm font-medium text-gray-500'>
                            Kota/Kabupaten
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <SelectCity
                                showLabel={false}
                                cities={cities || []}
                                defaultValue={{
                                  value: 3373,
                                  label: 'KOTA SALATIGA',
                                }}
                                validation={{
                                  required: 'Kota tidak boleh kosong',
                                }}
                                disabled={!cities}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.kota}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='flex items-center text-sm font-medium text-gray-500'>
                            Provinsi
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='province'
                                type='text'
                                defaultValue={getDatabyID.provinsi}
                                readOnly
                                validation={{
                                  required: 'Provinsi tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.provinsi}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='flex items-center text-sm font-medium text-gray-500'>
                            Region
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='region'
                                type='text'
                                defaultValue={getDatabyID.region}
                                readOnly
                                validation={{
                                  required: 'Region tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.region}
                              </span>
                            )}
                          </div>
                        </div>
                      </dl>
                      <div className='space-y-1'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900'>
                          Profil Ketua
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
                                defaultValue={getDatabyID.anggota.nama}
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
                                defaultValue={getDatabyID.anggota.email}
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
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                          <dt className='flex items-center text-sm font-medium text-gray-500'>
                            NISN
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <LightInput
                                id='leader-nisn'
                                type='text'
                                defaultValue={getDatabyID.anggota.nisn}
                                validation={{
                                  required: 'NISN tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.nisn}
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
                                defaultValue={getDatabyID.anggota.phone_number}
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
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            ID Line
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='leader-line'
                                defaultValue={getDatabyID.anggota.id_line}
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
                            Alamat
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='leader-address'
                                type='text'
                                defaultValue={getDatabyID.anggota.alamat}
                                validation={{
                                  required: 'Alamat tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.alamat}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Foto Kartu Pelajar/Surat Keterangan Siswa Aktif
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <DragnDropInput
                                label='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif'
                                id='leader-id'
                                accept='image/png, image/jpg, image/jpeg'
                                helperText='File dalam format jpg, png, atau jpeg'
                                maxFiles={1}
                                validation={{
                                  required:
                                    'Foto Kartu Pelajar tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.kp}
                              </span>
                            )}
                          </div>
                        </div>
                      </dl>
                      <div className='my-3 space-y-1'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900 '>
                          Profil Anggota 1
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
                                defaultValue={getDatabyID.anggota2.nama}
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
                                defaultValue={getDatabyID.anggota2.email}
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
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                          <dt className='flex items-center text-sm font-medium text-gray-500'>
                            NISN
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <LightInput
                                id='member-nisn'
                                type='text'
                                defaultValue={getDatabyID.anggota2.nisn}
                                validation={{
                                  required: 'NISN tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota.nisn}
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
                                defaultValue={getDatabyID.anggota2.phone_number}
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
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            ID Line
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='member-line'
                                defaultValue={getDatabyID.anggota2.id_line}
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
                            Alamat
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <StandAloneInput
                                id='member-address'
                                type='text'
                                defaultValue={getDatabyID.anggota.alamat}
                                validation={{
                                  required: 'Alamat tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.alamat}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Foto Kartu Pelajar/Surat Keterangan Siswa Aktif
                          </dt>
                          <div className='flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {isEditing ? (
                              <DragnDropInput
                                label='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif'
                                id='member-id'
                                accept='image/png, image/jpg, image/jpeg'
                                helperText='File dalam format jpg, png, atau jpeg'
                                maxFiles={1}
                                validation={{
                                  required:
                                    'Foto Kartu Pelajar tidak boleh kosong',
                                }}
                              />
                            ) : (
                              <span className='flex-grow'>
                                {getDatabyID.anggota2.kp}
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
                              disabled={isLoading}
                              className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-100 bg-dark-600 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100'
                            >
                              Save
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
    kota: 'KOTA BEKASI',
    provinsi: 'Jawa Barat',
    anggota: {
      nama: 'Rizqi Tsani',
      email: 'tsani@mail.com',
      phone_number: '0813837162',
      id_line: 'tsaniii',
      nisn: '1111',
      alamat: 'Jalan Raya No 1',
      kp: '[File1_1]',
    },
    anggota2: {
      nama: 'Agus Budi',
      email: 'budi@mail.com',
      phone_number: '0813837162',
      id_line: 'budii',
      nisn: '1122',
      alamat: 'Jalan Raya No 2',
      kp: '[File1_2]',
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
    anggota: {
      nama: 'Bobu Tsani',
      email: 'bobu@mail.com',
      phone_number: '0813837162',
      id_line: 'bobuii',
      nisn: '2211',
      alamat: 'Jalan Raya No 3',
      kp: '[File2_1]',
    },
    anggota2: {
      nama: 'Bibu Budi',
      email: 'bibu@mail.com',
      phone_number: '0813837162',
      id_line: 'bibui',
      nisn: '2222',
      alamat: 'Jalan Raya No 4',
      kp: '[File2_2]',
    },
  },
];
