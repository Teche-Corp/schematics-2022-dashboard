import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import SelectInput from '@/components/SelectInput';
import SelectInput2 from '@/components/SelectInput2';
import SubmitButton from '@/components/SubmitButton';
import { useAuthState } from '@/contexts/AuthContext';
import { INFO_SCH, NLC_REGION, VACCINE_TYPE } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

export default function CreateTeamKetua() {
  const methods = useForm();
  const history = useHistory();
  const { control, handleSubmit } = methods;
  const [provinces, setProvinces] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const { user } = useAuthState();

  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_nlc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  const handleCreateTeamKetua = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (
        ['bukti_vaksin', 'bukti_poster', 'bukti_twibbon', 'surat'].includes(key)
      ) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    toast.promise(
      axios.post('/register_nlc_ketua', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/nlc/payment');
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
      console.log(teamPayment.data);
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
        history.push('/nlc/payment');
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
              label='Pilihan Region'
              options={NLC_REGION}
              validation={{
                required: 'Pilihan region tidak boleh kosong',
              }}
              placeholder='Pilih region anda'
              id='region'
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
                  value: 3,
                  message: 'Panjang nama guru pendamping setidaknya 3 karakter',
                },
                maxLength: {
                  value: 64,
                  message: 'Panjang nama guru pendamping maksimal 64 karakter',
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
              validation={{
                required: 'Nama lengkap tidak boleh kosong',
                minLength: {
                  value: 6,
                  message: 'Nama lengkap setidaknya memiliki 6 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Nama lengkap maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label='Email'
              id='email'
              type='email'
              defaultValue={user.email}
              validation={{
                required: 'Email tidak boleh kosong',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Email tidak valid',
                },
              }}
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
              placeholder='+6285123456'
              defaultValue={user.no_telp}
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
                  message: 'Nama lengkap maksimal memiliki 128 karakter',
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
            <Input
              label='Darimana kamu mendapat informasi Schematics'
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              id='info_sch'
            />
            <SelectInput
              label='Jenis Vaksinasi COVID-19'
              options={VACCINE_TYPE}
              validation={{
                required: 'Jenis vaksinasi COVID-19 tidak boleh kosong',
              }}
              placeholder='Pilih jenis vaksinasi anda'
              id='jenis_vaksin'
            />
            <hr className='w-full bg-white' />
            <DragnDropInput
              label='Sertifikat Vaksinasi atau Surat Keterangan'
              id='bukti_vaksin'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Sertifikat Vaksinasi atau Surat Keterangan tidak boleh kosong',
              }}
            />
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
            <DragnDropInput
              label='Bukti Upload Twibbon Media Sosial, link: https://drive.google.com/drive/folders/1MMaohKdSb3EmrSnq8E--Ssk15BX1lhzV'
              id='bukti_twibbon'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Bukti Upload Twibbon Media Sosial tidak boleh kosong',
              }}
            />
            <DragnDropInput
              label='Bukti Upload Poster Instagram Story: link: https://drive.google.com/file/d/1GOjom5-0FyyQkd1JNGxJiLjOrYKKxxBD/view?usp=sharing'
              id='bukti_poster'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Bukti Upload Poster Instagram Story tidak boleh kosong',
              }}
            />
            <div>
              <SubmitButton
                className='mt-16 bg-nlc-300 font-primary'
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
