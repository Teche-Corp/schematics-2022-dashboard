import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import SelectInput2 from '@/components/SelectInput2';
import SubmitButton from '@/components/SubmitButton';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '@/contexts/AuthContext';
import { useForm, FormProvider } from 'react-hook-form';
import { INFO_SCH, VACCINE_TYPE } from '@/lib/constants';

function NSTcard() {
  const methods = useForm();
  const { user } = useAuthState();
  const [value, setValue] = useState(
    'Darimana kamu mendapat informasi Schematics',
  );

  return (
    <>
      <Input
        label={'Nama Lengkap'}
        id='name'
        // defaultValue={user.name}
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
        // defaultValue={user.email}
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
        label='Nomor Telepon'
        id='no_telp'
        placeholder='+6285123456'
        // defaultValue={user.no_telp}
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
      <SelectInput2
        label='Darimana kamu mendapat informasi Schematics'
        options={INFO_SCH}
        validation={{
          required: 'Asal informasi Schematics tidak boleh kosong',
        }}
        id='info_sch'
      />

      {/*  */}
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
    </>
  );
}

export default function NSTregister() {
  const methods = useForm();
  const [cardAdd, setCardAdd] = useState([]);
  const { control, handleSubmit } = methods;

  const { user } = useAuthState();

  function addCard() {
    setCardAdd(cardAdd.concat(<NSTcard key={cardAdd.length} />));
  }
  const handleNSTRegister = async (data) => {
    const formData = new FormData();
    // console.log(data);
    for (let key in data) {
      console.log(key);
    }
  };

  return (
    <div className='w-full bg-black'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <FormProvider {...methods}>
          {/* Loop  */}
          <form
            onSubmit={handleSubmit(handleNSTRegister)}
            className='space-y-4 mt-16'
          >
            <NSTcard />
            {cardAdd}
            {cardAdd.length < 4 && (
              <button
                className='text-neutral-400 bg-white px-4 py-2 rounded-md font-primary text-center'
                onClick={addCard}
                type='button'
              >
                Tambah Tiket
              </button>
            )}
            <div>
              <SubmitButton
                className='mt-8 bg-nst-400 font-primary'
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

// Nama Lengkap, Email, No. handphone, Alamat tempat Tinggal,  Darimana kamu mendapatkan informasi Schematics NST?,  Jenis Vaksinasi COVID-19, Sertifikat Vaksinasi atau Surat Dokter
