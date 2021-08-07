import axios from 'axios';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { useHistory, useParams, Link } from 'react-router-dom';

import { useAuthDispatch } from '@/contexts/AuthContext';
import useLoadingToast from '@/hooks/useLoadingToast';
import useSWRLoadingToast from '@/hooks/useSWRLoadingToast';
import useQuery from '@/hooks/useQuery';
import { bearerToken, classNames, defaultToastMessage } from '@/lib/helper';
import { getWithToken, postDetailTim } from '@/lib/swr';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';
import SelectInput from '@/components/SelectInput';
import CheckboxInput from '@/components/CheckboxInput';
import ImageLightbox from '@/components/ImageLightbox';
import DeleteTeamAlert from '@/components/Alert/DeleteTeamAlert';

export default function UpdateUserNLC() {
  const history = useHistory();
  const query = useQuery();
  let { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isLoading = useLoadingToast();

  const page = query.get('page');
  if (!page) {
    history.replace('/admin/sch-nlc/user');
  }

  // Data Fetching
  const { revalidate: revalidateTable } = useSWR(
    `/admin/list/tim/nlc?page=${page}`,
    getWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const {
    data: detailTim,
    error: errorDetailTim,
    revalidate: revalidateDetail,
  } = useSWR(['/admin/detail_tim', id], postDetailTim);
  useSWRLoadingToast(detailTim, errorDetailTim, {
    loading: 'Mengambil data tim...',
    success: 'Data tim berhasil diambil',
  });
  const teamData = detailTim?.data;

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

  const paymentMethod = [
    { text: 'QRIS', value: 0 },
    { text: 'Mandiri', value: 1 },
  ];

  const cityValue = useWatch({
    control,
    name: 'city',
  });

  const defaultValue = () => {
    if (!cities) {
      return [];
    }

    const city = cities.find(
      (city) => city?.regency_name === teamData?.kota?.regency_name,
    );
    return [
      { name: 'team_name', value: teamData?.team_name },
      { name: 'school_name', value: teamData?.institusi },
      { name: 'leader_name', value: teamData?.anggota[0]?.nama },
      { name: 'leader_email', value: teamData?.anggota[0]?.email },
      { name: 'leader_nisn', value: teamData?.anggota[0]?.nisn },
      { name: 'leader_phone', value: teamData?.anggota[0]?.nomor_telepon },
      { name: 'leader_line', value: teamData?.anggota[0]?.id_line },
      { name: 'leader_address', value: teamData?.anggota[0]?.alamat },
      { name: 'member_name', value: teamData?.anggota[1]?.nama },
      { name: 'member_email', value: teamData?.anggota[1]?.email },
      { name: 'member_nisn', value: teamData?.anggota[1]?.nisn },
      { name: 'member_phone', value: teamData?.anggota[1]?.nomor_telepon },
      { name: 'member_line', value: teamData?.anggota[1]?.id_line },
      { name: 'member_address', value: teamData?.anggota[1]?.alamat },
      { name: 'jumlah_bayar', value: teamData?.bukti_pembayaran?.jumlah },
      {
        name: 'payment_method',
        value: teamData?.bukti_pembayaran?.sumber === 'Mandiri' ? '1' : '0',
      },
      { name: 'verified', value: teamData?.bukti_pembayaran?.verified },
      { name: 'city', value: { value: city?.id, label: city?.regency_name } },
      { name: 'province', value: city?.province_name },
      { name: 'region', value: city?.region_name },
    ];
  };

  // Set default value to input
  useEffect(() => {
    if (teamData !== undefined) {
      defaultValue().forEach(({ name, value }) =>
        setValue(name, value, { shouldDirty: false }),
      );
    }
    if (cities && teamData !== undefined) {
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
      setValue('region', city?.region_name, {
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamData, cities, setValue]);

  useEffect(() => {
    if (cityValue !== undefined && teamData !== undefined) {
      const id = cityValue?.value;
      const city = cities.find((city) => city.id === id);
      if (teamData?.kota?.regency_name !== city?.regency_name) {
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

  const resetValue = () => {
    const valToReset = {};
    defaultValue().forEach(({ name, value }) => (valToReset[name] = value));
    reset(valToReset);
  };

  const handleEditProfile = (data) => {
    const newBody = {
      team_id: Number(id),
      kota_id: data.city.value,
      nama_team: data['team_name'],
      institusi: data['school_name'],
      ketua_anggota_id: teamData.anggota[0].anggota_id,
      nama_ketua: data['leader_name'],
      email_ketua: data['leader_email'],
      telp_ketua: data['leader_phone'],
      nisn_ketua: data['leader_nisn'],
      alamat_ketua: data['leader_address'],
      line_ketua: data['leader_line'],
      sumber_bayar: data['payment_method'] === '0' ? 'QRIS' : 'Mandiri',
      verified_bayar: data['verified'],
      anggota: [
        {
          anggota_id: teamData.anggota[1].anggota_id,
          nama: data['member_name'],
          email: data['member_email'],
          telp: data['member_phone'],
          nisn: data['member_nisn'],
          alamat: data['member_address'],
          line: data['member_line'],
        },
      ],
    };

    toast.promise(
      axios
        .post('/admin/update_tim', newBody, {
          headers: { ...bearerToken() },
        })
        .then((res) => {
          dispatch('ASSIGN_NLC', res.data.data);
        })
        .then(() => {
          revalidateDetail();
          revalidateTable();
        })
        .finally(() => setIsEditing(false)),
      {
        ...defaultToastMessage,
        success: 'Tim berhasil diperbarui',
      },
    );
  };

  const handleRemoveTeam = () => {
    toast.promise(
      axios
        .post(
          '/admin/delete_tim',
          { team_id: id },
          {
            headers: { ...bearerToken() },
          },
        )
        .then(() => {
          revalidateTable();
          setIsOpenAlert(false);
          history.replace('/admin/sch-nlc/user');
        }),
      {
        ...defaultToastMessage,
        success: 'Tim berhasil dihapus',
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
        <DeleteTeamAlert
          open={isOpenAlert}
          setOpen={setIsOpenAlert}
          action={handleRemoveTeam}
        />
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <FormProvider {...methods}>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit(handleEditProfile)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <div className='flex items-center mb-6 '>
                      <Link to='/admin/sch-nlc/user'>
                        <HiOutlineArrowCircleLeft className='w-6 h-6' />
                      </Link>
                      <h1 className='ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                        <span className='block xl:inline'>
                          {isEditing ? 'Edit Tim' : 'Detail Tim'}
                        </span>{' '}
                        <span className='block text-nlc xl:inline'>
                          Schematics NLC
                        </span>
                      </h1>
                    </div>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama Tim'
                          id='team_name'
                          type='text'
                          disabled={!isEditing}
                          validation={{
                            required: 'Nama Tim tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Asal Sekolah'
                          id='school_name'
                          type='text'
                          disabled={!isEditing}
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
                          disabled
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Region'
                          id='region'
                          type='text'
                          validation={{ required: 'Region tidak boleh kosong' }}
                          disabled
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
                          id='leader_name'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='leader_email'
                          type='email'
                          disabled={!isEditing}
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
                          id='leader_nisn'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='leader_phone'
                          type='text'
                          helperText='Nomor Telepon diawali +62'
                          disabled={!isEditing}
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
                          id='leader_line'
                          type='text'
                          disabled={!isEditing}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='leader_address'
                          type='text'
                          disabled={!isEditing}
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
                            <ImageLightbox
                              src={teamData?.anggota[0]?.url}
                              alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Ketua'
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
                      Data Anggota
                    </h3>
                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nama'
                          id='member_name'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'Nama tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Email'
                          id='member_email'
                          type='email'
                          disabled={!isEditing}
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
                          id='member_nisn'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-4'>
                        <LightInput
                          label='Nomor Telepon'
                          id='member_phone'
                          type='text'
                          disabled={!isEditing}
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
                          id='member_line'
                          type='text'
                          disabled={!isEditing}
                        />
                      </div>

                      <div className='sm:col-span-6'>
                        <LightInput
                          label='Alamat'
                          id='member_address'
                          type='text'
                          disabled={!isEditing}
                          validation={{
                            required: 'Alamat tidak boleh kosong',
                          }}
                        />
                      </div>

                      {teamData && (
                        <div className='col-span-full'>
                          <label
                            htmlFor={teamData?.anggota[1]?.url}
                            className='block text-sm font-normal text-gray-700'
                          >
                            Foto Kartu Pelajar/Surat Keterangan Siswa Aktif
                          </label>
                          <div className='relative mt-1'>
                            <ImageLightbox
                              src={teamData?.anggota[1]?.url}
                              alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Anggota'
                              className='max-h-80'
                              id={teamData?.anggota[1]?.url}
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
                            id='jumlah_bayar'
                            type='text'
                            disabled={true}
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
                            id='payment_method'
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
                          disabled={!isEditing}
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
                            <ImageLightbox
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
                  <div className='flex justify-between'>
                    <button
                      type='button'
                      onClick={() => setIsOpenAlert(true)}
                      className='px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-md shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                      Hapus Tim
                    </button>
                    <div>
                      {isEditing ? (
                        <>
                          <button
                            type='button'
                            onClick={() => {
                              resetValue();
                              handleEditClick();
                            }}
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
                        <>
                          <Link
                            to='/admin/sch-nlc/user'
                            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                          >
                            Kembali
                          </Link>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditClick();
                            }}
                            className={classNames(
                              'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-100 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-100',
                              isLoading && 'filter brightness-90 cursor-wait',
                            )}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
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
