import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import SelectInput from '@/components/SelectInput';
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

export default function CreateTeamJuniorKetua() {
  const methods = useForm();
  const history = useHistory();
  const { control, handleSubmit } = methods;
  const [provinces, setProvinces] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const { user } = useAuthState();

  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_npc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

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
                  value: 6,
                  message: 'Panjang nama tim setidaknya 6 karakter',
                },
                maxLength: {
                  value: 32,
                  message: 'Panjang nama tim setidaknya 32 karakter',
                },
              }}
              id='nama_team'
            />
            <Input
              label={'Nama Sekolah'}
              validation={{
                required: 'Nama sekolah tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Panjang nama sekolah setidaknya 8 karakter',
                },
                maxLength: {
                  value: 64,
                  message: 'Panjang nama sekolah setidaknya 64 karakter',
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
              label={'Nama Guru Pendamping'}
              validation={{
                required: 'Nama guru pendamping tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Panjang nama guru pendamping setidaknya 8 karakter',
                },
                maxLength: {
                  value: 64,
                  message:
                    'Panjang nama guru pendamping setidaknya 64 karakter',
                },
              }}
              id='nama_guru_pendamping'
            />
            <Input
              label='Nomor Telepon Guru Pendamping'
              id='no_telp_guru_pendamping'
              placeholder='+6285123456'
              validation={{
                required: 'Nomor Telepon tidak boleh kosong',
                pattern: {
                  value: /^\+628[1-9][0-9]{7,11}$/,
                  message:
                    'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
                },
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
              label={'NISN'}
              id='nisn'
              validation={{
                required: 'NISN tidak boleh kosong',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    'NISN Harus berupa angka dan memiliki panjang 10 karakter',
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
                    'Nomor Telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
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
                    'Nomor Whatsapp harus diawali +62 dan memiliki panjang 13-15 karakter',
                },
              }}
            />
            <Input
              label={'ID Line'}
              id='id_line'
              validation={{
                required: 'ID Line tidak boleh kosong',
                maxLength: {
                  value: 128,
                  message: 'ID Line maksimal memiliki 128 karakter',
                },
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
            <SelectInput
              label='Darimana kamu mendapat informasi Schematics'
              options={INFO_SCH}
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              id='info_sch'
            />
            <hr className='w-full bg-white' />
            <DragnDropInput
              label='Kartu Pelajar/Surat Keterangan Aktif/Surat Tugas'
              id='surat'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
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
