import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import SelectInput from '@/components/SelectInput';
import SelectInput2 from '@/components/SelectInput2';
import SubmitButton from '@/components/SubmitButton';
import { useAuthState } from '@/contexts/AuthContext';
import { INFO_SCH } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

export default function CreateTeamSeniorKetua() {
  const methods = useForm();
  const history = useHistory();
  const { control, handleSubmit, watch } = methods;
  const [provinces, setProvinces] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const { user } = useAuthState();
  // const kode_voucher = watch('kode_voucher');

  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_npc');

  const handleCreateTeamKetua = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (['surat'].includes(key)) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append('kategori', 'senior');

    toast.promise(
      axios.post('/register_npc_ketua', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/npc_senior/payment');
          return 'Berhasil membuat tim';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  // const handleCheckKode = async () => {
  //   if (kode_voucher === undefined) {
  //     return toast.error('Anda belum mengisi form kode promo');
  //   }
  //   toast.promise(
  //     axios.post(
  //       '/check_voucher',
  //       {
  //         kode: kode_voucher,
  //         region: 0,
  //         tipe: 'npc_senior',
  //       },
  //       {
  //         headers: { ...bearerToken() },
  //       },
  //     ),
  //     {
  //       loading: 'Loading...',
  //       success: 'Kode promo dapat digunakan',
  //       error: (err) => {
  //         return err.response.data.message;
  //       },
  //     },
  //   );
  // };

  const { data: provincesData, error: errorProvinces } = useSWR('/provinces');

  const provinceValue = useWatch({
    control,
    name: 'id_provinsi',
  });

  useEffect(() => {
    if (provincesData) {
      const provinces = provincesData.data.map((provinsi) => {
        return {
          text: provinsi.provinsi,
          value: provinsi.id,
        };
      });
      setProvinces(provinces);
    }
  }, [provincesData]);

  const { data: citiesData } = useSWR(
    provinceValue ? `/cities/${provinceValue}` : null,
  );

  useEffect(() => {
    if (provinceValue && citiesData) {
      const cities = citiesData.data.map((city) => {
        return {
          text: city.kota,
          value: city.id,
        };
      });
      setCities(cities);
    }
  }, [provinceValue, citiesData]);

  useEffect(() => {
    if (teamPayment) {
      if (
        teamPayment.data.status === 'active' ||
        teamPayment.data.status === 'awaiting_verification'
      ) {
        history.push('/landing');
      }
      if (
        teamPayment.data.status === 'need_revision' ||
        teamPayment.data.status === 'awaiting_payment'
      ) {
        history.push('/npc/payment');
      }
    }
  }, [teamPayment]);

  if (errorProvinces) return <Error500 />;
  if (!provincesData) return <Loading />;

  return (
    <div className='w-full bg-dark-400 min-h-screen'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleCreateTeamKetua)}
            className='space-y-4 mt-16'
          >
            <Input
              label={'Nama Tim'}
              validation={{
                required: 'Nama tim tidak boleh kosong',
                minLength: {
                  value: 3,
                  message: 'Panjang nama tim setidaknya 3 karakter',
                },
                maxLength: {
                  value: 32,
                  message: 'Panjang nama tim setidaknya 32 karakter',
                },
              }}
              id='nama_team'
            />
            <Input
              label={'Nama Universitas'}
              validation={{
                required: 'Nama Universitas tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Panjang Nama Universitas setidaknya 8 karakter',
                },
                maxLength: {
                  value: 64,
                  message: 'Panjang Nama Universitas setidaknya 64 karakter',
                },
              }}
              id='asal_sekolah'
            />
            <SelectInput
              label='Provinsi'
              options={provinces}
              validation={{
                required: 'Provinsi tidak boleh kosong',
              }}
              placeholder='Pilih provinsi domisili anda'
              id='id_provinsi'
            />
            <SelectInput
              label='Kabupaten/Kota'
              disabled={provinceValue ? false : true}
              options={cities}
              validation={{
                required: 'kabupaten/kota tidak boleh kosong',
              }}
              placeholder='Pilih kabupaten/kota domisili anda'
              id='id_kota'
            />
            <Input
              label={'Nama Dosen Pendamping (opsional)'}
              validation={{
                required: false,
              }}
              id='nama_guru_pendamping'
            />
            <Input
              label='Nomor Telepon Dosen Pendamping (opsional)'
              id='no_telp_guru_pendamping'
              placeholder='+6285123456'
              validation={{
                required: false,
              }}
            />
            <hr className='bg-white w-full' />
            <Input
              label={'Nama Lengkap'}
              id='name'
              defaultValue={user.name}
              disabled={true}
            />
            <Input
              label='Email'
              id='email'
              type='email'
              defaultValue={user.email}
              disabled={true}
            />
            <Input
              label={'Nomor Induk Mahasiswa'}
              id='nisn'
              validation={{
                required: 'Nomor Induk Mahasiswa boleh kosong',
                minLength: {
                  value: 5,
                  text: 'Nomor Induk Mahasiswa setidaknya sepanjang 5 karakter',
                },
              }}
            />
            <Input
              label='Nomor Telepon'
              id='no_telp'
              placeholder='+6285123456'
              defaultValue={user.no_telp}
              validation={{
                required: 'Nomor Telepon tidak boleh kosong',
                pattern: {
                  value: /^\+628[1-9][0-9]{7,11}$/,
                  message:
                    'Nomor Telepon harus diawali +62 dan memiliki panjang 12-16 karakter',
                },
              }}
            />
            <Input
              label='Nomor Whatsapp'
              id='no_wa'
              defaultValue={user.no_telp}
              placeholder='+6285123456'
              validation={{
                required: 'Nomor Whatsapp tidak boleh kosong',
                pattern: {
                  value: /^\+628[1-9][0-9]{7,11}$/,
                  message:
                    'Nomor Whatsapp harus diawali +62 dan memiliki panjang 12-16 karakter',
                },
              }}
            />
            <Input
              label={'ID Line (opsional)'}
              id='id_line'
              validation={{
                required: false,
              }}
            />
            <Input
              label={'Discord Tag'}
              id='discord_tag'
              validation={{
                required: 'Discord Tag tidak boleh kosong',
                maxLength: {
                  value: 128,
                  message: 'Discord Tag maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label={'Alamat Domisili'}
              id='alamat'
              validation={{
                required: 'Alamat domisili tidak boleh kosong',
                minLength: {
                  value: 16,
                  message: 'Alamat domisili setidaknya memiliki 16 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Alamat domisili maksimal memiliki 128 karakter',
                },
              }}
            />
            {/* <div className='w-full space-y-2'>
              <div className='w-full'>
                <Input
                  label='Kode Voucher'
                  validation={{
                    maxLength: {
                      value: 32,
                      message: 'Kode promo tidak boleh lebih dari 32 karakter',
                    },
                  }}
                  id='kode_voucher'
                />
              </div>
              <div className='w-1/5'>
                <button
                  type='button'
                  onClick={handleCheckKode}
                  className='flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-light-700 font-primary bg-npc'
                >
                  Cek Kode
                </button>
              </div>
            </div> */}
            <Input
              label='Darimana kamu mendapat informasi Schematics?'
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              id='info_sch'
            />
            <hr className='w-full bg-white' />
            <DragnDropInput
              label='Foto Kartus Tanda Mahasiswa/Surat Keterangan Mahasiswa Aktif'
              id='surat'
              accept='image/png, image/jpg, image/jpeg'
              helperText='*File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Kartu Pelajar/Surat Keterangan Aktif/Surat Tugas tidak boleh kosong',
              }}
            />
            <div>
              <SubmitButton
                className='mt-16 bg-npc font-primary'
                loading={false}
              >
                Daftar
              </SubmitButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
