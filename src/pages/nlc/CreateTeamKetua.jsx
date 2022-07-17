import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import SubmitButton from '@/components/SubmitButton';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export default function CreateTeamKetua() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const positions = [
    {
      value: 'ketua',
      text: 'Ketua',
    },
    {
      value: 'anggota',
      text: 'Anggota',
    },
  ];

  const regions = [
    {
      value: 1,
      text: 'Madiun',
    },
    {
      value: 2,
      text: 'Kediri',
    },
    {
      value: 3,
      text: 'Surabaya',
    },
  ];

  const provinces = [
    {
      value: 1,
      text: 'Jawa Timur',
    },
    {
      value: 2,
      text: 'Jawa Tengah',
    },
    {
      value: 3,
      text: 'Jawa Barat',
    },
  ];

  const cities = [
    {
      value: 1,
      text: 'Ngawi',
    },
    {
      value: 2,
      text: 'Madiun',
    },
    {
      value: 3,
      text: 'Surabaya',
    },
  ];

  const vaccine_types = [
    {
      value: '1',
      text: 'Pertama',
    },
    {
      value: '2',
      text: 'Kedua',
    },
    {
      value: '3',
      text: 'Booster',
    },
    {
      value: 'health_problem',
      text: 'Masalah Kesehatan',
    },
  ];

  const handleCreateTeamKetua = (data) => {
    console.log(data);
  };

  return (
    <div className='w-full bg-black'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleCreateTeamKetua)}
            className='space-y-4 mt-16'
          >
            <SelectInput
              label='Posisi dalam tim'
              options={positions}
              validation={{
                required: 'Posisi dalam tim tidak boleh kosong',
              }}
              placeholder='Pilih posisi anda dalam tim'
              id='team-position'
            />
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
              id='team-name'
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
              id='school-name'
            />
            <SelectInput
              label='Pilihan Region'
              options={regions}
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
              id='province'
            />
            <SelectInput
              label='Kabupaten/Kota'
              options={cities}
              validation={{
                required: 'kabupaten/kota tidak boleh kosong',
              }}
              placeholder='Pilih kabupaten/kota domisili anda'
              id='city'
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
              id='gp-name'
            />
            <Input
              label='Nomor Telepon Guru Pendamping'
              id='phone-gp'
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
              label='Nomor Telepon atau Whatsapp'
              id='phone'
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
            <Input
              label={'ID Line'}
              id='idline'
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
              id='address'
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
              label='Jenis Vaksinasi COVID-19'
              options={vaccine_types}
              validation={{
                required: 'Jenis vaksinasi COVID-19 tidak boleh kosong',
              }}
              placeholder='Pilih jenis vaksinasi anda'
              id='vaccine_type'
            />
            <hr className='w-full bg-white' />
            <DragnDropInput
              label='Sertifikat Vaksinasi atau Surat Keterangan'
              id='vaccine_certificate'
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
              id='student_card'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Kartu Pelajar/Surat Keterangan Aktif/Surat Tugas tidak boleh kosong',
              }}
            />
            <DragnDropInput
              label='Bukti Upload Twibbon Media Sosial'
              id='twibbon_file'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Bukti Upload Twibbon Media Sosial tidak boleh kosong',
              }}
            />
            <DragnDropInput
              label='Bukti Upload Poster Instagram Story'
              id='ig_poster_file'
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
