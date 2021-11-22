import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, Link, useHistory } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useAuthDispatch } from '@/contexts/AuthContext';
import { bearerToken, classNames, defaultToastMessage } from '@/lib/helper';
import { getWithToken, postDetailTim } from '@/lib/swr';

import useQuery from '@/hooks/useQuery';
import useLoadingToast from '@/hooks/useLoadingToast';
import useSWRLoadingToast from '@/hooks/useSWRLoadingToast';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import LightInput from '@/components/LightInput';
import SelectCity from '@/components/SelectCity';
import SelectInput from '@/components/SelectInput';
import CheckboxInput from '@/components/CheckboxInput';
import ImageLightbox from '@/components/ImageLightbox';
import DeleteTeamAlert from '@/components/Alert/DeleteTeamAlert';

const paymentMethod = [
  { text: 'QRIS', value: 0 },
  { text: 'Mandiri', value: 1 },
];

export default function UpdateUserNpcJunior() {
  const history = useHistory();
  const query = useQuery();
  let { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isLoading = useLoadingToast();

  const page = query.get('page');
  if (!page) {
    history.replace('/admin/sch-npc/junior/user');
  }

  const { revalidate: revalidateTable } = useSWR(
    page ? `/admin/list/tim/npcj?page=${page}` : '/admin/list/tim/npcj',
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
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(teamData);
  }, [reset, teamData]);

  const dispatch = useAuthDispatch();

  const { data, error: fetchError } = useSWR('/region/list');
  const cities = data?.data;
  const cityValue = watch('city');

  const city = (cities ?? []).find(
    (city) => city?.regency_name === teamData?.kota?.regency_name,
  );
  const defaultValues = {
    team_name: teamData?.team_name,
    school_name: teamData?.institusi,
    leader_name: teamData?.anggota[0]?.nama,
    leader_email: teamData?.anggota[0]?.email,
    leader_nisn: teamData?.anggota[0]?.nisn,
    leader_phone: teamData?.anggota[0]?.nomor_telepon,
    leader_line: teamData?.anggota[0]?.id_line,
    leader_discord: teamData?.anggota[0]?.id_facebook,
    leader_address: teamData?.anggota[0]?.alamat,
    jumlah_bayar: teamData?.bukti_pembayaran?.jumlah,
    payment_method:
      teamData?.bukti_pembayaran?.sumber === 'Mandiri' ? '1' : '0',
    verified: teamData?.bukti_pembayaran?.verified,
    city: { value: city?.id, label: city?.regency_name },
    province: city?.province_name,
    region: city?.region_name,
  };

  const setValuesToDefault = () => {
    Object.entries(defaultValues).forEach(([name, value]) =>
      setValue(name, value, { shouldDirty: false }),
    );
  };

  //? Set default value to input after fetching
  useEffect(() => {
    if (teamData && city) {
      setValuesToDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamData, city]);

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

  const resetValue = () => {
    setValuesToDefault();
    reset(defaultValues);
  };

  const handleEditUserNpcJunior = (data) => {
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
      facebook_ketua: data['leader_discord'],
      sumber_bayar: data['payment_method'] === '0' ? 'QRIS' : 'Mandiri',
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
        .then(() => {
          revalidateDetail();
          revalidateTable();
        })
        .finally(() => setIsEditing(false)),
      {
        loading: 'Loading...',
        success: 'Tim berhasil diperbarui',
        error: (err) =>
          err.response.data.msg ?? 'Terjadi kesalahan, mohon coba lagi',
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
          history.replace('/admin/sch-npc/junior/user');
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
                onSubmit={handleSubmit(handleEditUserNpcJunior)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <div className='flex items-center mb-6 '>
                      <Link to='/admin/sch-npc/junior/user'>
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
                          id='leader_nisn'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'NISN tidak boleh kosong' }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Username Discord'
                          id='leader_discord'
                          type='text'
                          helperText='Username dapat dilihat di bagian profil akun. Contoh: Schematics#2021'
                          disabled={!isEditing}
                          validation={{
                            required: 'Username Discord tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
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

                      <div className='sm:col-span-3'>
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
                        <>
                          <Link
                            to='/admin/sch-npc/junior/user'
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
