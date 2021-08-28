import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';

import { useAuthDispatch } from '@/contexts/AuthContext';
import { bearerToken, classNames, defaultToastMessage } from '@/lib/helper';
import { getWithToken, postDetailTim } from '@/lib/swr';

import useLoadingToast from '@/hooks/useLoadingToast';
import useQuery from '@/hooks/useQuery';
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

export default function UpdateUserNpcSenior() {
  const history = useHistory();
  const query = useQuery();
  let { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [teamData, setTeamData] = useState(undefined);
  const isLoading = useLoadingToast();

  const page = query.get('page');
  if (!page) {
    history.replace('/admin/sch-npc/senior/user');
  }

  const { revalidate: revalidateTable } = useSWR(
    page ? `/admin/list/tim/npcs?page=${page}` : '/admin/list/tim/npcs',
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
  const team = detailTim?.data;

  useEffect(() => {
    if (team) {
      team?.anggota?.forEach((item, index, team) => {
        if (item.role === 'KETUA') {
          team.unshift(team.splice(index, 1)[0]);
        }
      });
      setTeamData(team);
    }
  }, [team]);

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
    university_name: teamData?.institusi,
    leader_name: teamData?.anggota[0]?.nama,
    leader_email: teamData?.anggota[0]?.email,
    leader_nim: teamData?.anggota[0]?.nisn,
    leader_phone: teamData?.anggota[0]?.nomor_telepon,
    leader_line: teamData?.anggota[0]?.id_line,
    leader_discord: teamData?.anggota[0]?.id_facebook,
    leader_address: teamData?.anggota[0]?.alamat,
    member1_name: teamData?.anggota[1]?.nama,
    member1_email: teamData?.anggota[1]?.email,
    member1_nim: teamData?.anggota[1]?.nisn,
    member1_phone: teamData?.anggota[1]?.nomor_telepon,
    member1_line: teamData?.anggota[1]?.id_line,
    member1_discord: teamData?.anggota[1]?.id_facebook,
    member1_address: teamData?.anggota[1]?.alamat,
    member2_name: teamData?.anggota[2]?.nama,
    member2_email: teamData?.anggota[2]?.email,
    member2_nim: teamData?.anggota[2]?.nisn,
    member2_phone: teamData?.anggota[2]?.nomor_telepon,
    member2_line: teamData?.anggota[2]?.id_line,
    member2_discord: teamData?.anggota[2]?.id_facebook,
    member2_address: teamData?.anggota[2]?.alamat,
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (teamData && city) {
      setValuesToDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamData, city]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const handleEditUserNpcSenior = (data) => {
    const anggota_1_id = teamData?.anggota[1]?.anggota_id;
    const anggota_2_id = teamData?.anggota[2]?.anggota_id;
    const anggota = [];

    if (anggota_1_id) {
      const anggota_1 = {
        anggota_id: anggota_1_id,
        nama: data['member1_name'],
        email: data['member1_email'],
        telp: data['member1_phone'],
        nisn: data['member1_nim'],
        alamat: data['member1_address'],
        line: data['member1_line'],
        facebook: data['member1_discord'],
      };

      anggota.push(anggota_1);
    }

    if (anggota_2_id) {
      const anggota_2 = {
        anggota_id: anggota_2_id,
        nama: data['member2_name'],
        email: data['member2_email'],
        telp: data['member2_phone'],
        nisn: data['member2_nim'],
        alamat: data['member2_address'],
        line: data['member2_line'],
        facebook: data['member2_discord'],
      };

      anggota.push(anggota_2);
    }

    const newBody = {
      team_id: Number(id),
      kota_id: data.city.value,
      nama_team: data['team_name'],
      institusi: data['university_name'],
      ketua_anggota_id: teamData.anggota[0].anggota_id,
      nama_ketua: data['leader_name'],
      email_ketua: data['leader_email'],
      telp_ketua: data['leader_phone'],
      nisn_ketua: data['leader_nim'],
      alamat_ketua: data['leader_address'],
      line_ketua: data['leader_line'],
      facebook_ketua: data['leader_discord'],
      sumber_bayar: data['payment_method'] === '0' ? 'QRIS' : 'Mandiri',
      verified_bayar: data['verified'],
      anggota,
    };

    toast.promise(
      axios
        .post('/admin/update_tim', newBody, {
          headers: { ...bearerToken() },
        })
        .then((res) => {
          dispatch('ASSIGN_NPC_SENIOR', res.data.data.team_id);
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
          history.replace('/admin/sch-npc/senior/user');
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
                onSubmit={handleSubmit(handleEditUserNpcSenior)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <div className='flex items-center mb-6'>
                      <Link to='/admin/sch-npc/senior/user'>
                        <HiOutlineArrowCircleLeft className='w-6 h-6' />
                      </Link>
                      <h1 className='ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                        <span className='block xl:inline'>
                          {isEditing ? 'Edit Tim' : 'Detail Tim'}
                        </span>{' '}
                        <span className='block text-npc-400 xl:inline'>
                          Schematics NPC Senior
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
                          label='Asal Universitas'
                          id='university_name'
                          type='text'
                          disabled={!isEditing}
                          validation={{
                            required: 'Asal Universitas tidak boleh kosong',
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
                          label='NIM'
                          id='leader_nim'
                          type='text'
                          disabled={!isEditing}
                          validation={{ required: 'NIM tidak boleh kosong' }}
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
                              alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Ketua'
                              className='max-h-80'
                              id={teamData?.anggota[0]?.url}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {teamData?.anggota[1] && (
                    <div className='pt-8'>
                      <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                        Data Anggota 1
                      </h3>
                      <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='sm:col-span-4'>
                          <LightInput
                            label='Nama'
                            id='member1_name'
                            type='text'
                            disabled={!isEditing}
                            validation={{
                              required: 'Nama tidak boleh kosong',
                            }}
                          />
                        </div>

                        <div className='sm:col-span-4'>
                          <LightInput
                            label='Email'
                            id='member1_email'
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
                            label='NIM'
                            id='member1_nim'
                            type='text'
                            disabled={!isEditing}
                            validation={{
                              required: 'NIM tidak boleh kosong',
                            }}
                          />
                        </div>

                        <div className='sm:col-span-3'>
                          <LightInput
                            label='Username Discord'
                            id='member1_discord'
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
                            id='member1_phone'
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

                        <div className='sm:col-span-3'>
                          <LightInput
                            label='ID Line (Opsional)'
                            id='member1_line'
                            type='text'
                            disabled={!isEditing}
                          />
                        </div>

                        <div className='sm:col-span-6'>
                          <LightInput
                            label='Alamat'
                            id='member1_address'
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
                                src={teamData?.anggota[1]?.url ?? ''}
                                alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Anggota 1'
                                className='max-h-80'
                                id={teamData?.anggota[1]?.url}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {teamData?.anggota[2] && (
                    <div className='pt-8'>
                      <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                        Data Anggota 2
                      </h3>
                      <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='sm:col-span-4'>
                          <LightInput
                            label='Nama'
                            id='member2_name'
                            type='text'
                            disabled={!isEditing}
                            validation={{
                              required: 'Nama tidak boleh kosong',
                            }}
                          />
                        </div>

                        <div className='sm:col-span-4'>
                          <LightInput
                            label='Email'
                            id='member2_email'
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
                            label='NIM'
                            id='member2_nim'
                            type='text'
                            disabled={!isEditing}
                            validation={{
                              required: 'NIM tidak boleh kosong',
                            }}
                          />
                        </div>

                        <div className='sm:col-span-3'>
                          <LightInput
                            label='Username Discord'
                            id='member2_discord'
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
                            id='member2_phone'
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

                        <div className='sm:col-span-3'>
                          <LightInput
                            label='ID Line (Opsional)'
                            id='member2_line'
                            type='text'
                            disabled={!isEditing}
                          />
                        </div>

                        <div className='sm:col-span-6'>
                          <LightInput
                            label='Alamat'
                            id='member2_address'
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
                                src={teamData?.anggota[2]?.url}
                                alt='Foto Kartu Pelajar/Surat Keterangan Siswa Aktif Anggota 2'
                                className='max-h-80'
                                id={teamData?.anggota[2]?.url}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

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
                            to='/admin/sch-npc/senior/user'
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
