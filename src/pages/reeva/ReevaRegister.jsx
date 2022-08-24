import DragnDropInput from '@/components/DragnDropInput';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import SelectInput2 from '@/components/SelectInput2';
import SelectInput from '@/components/SelectInput';
import SubmitButton from '@/components/SubmitButton';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '@/contexts/AuthContext';
import { useForm, FormProvider } from 'react-hook-form';
import { INFO_SCH, VACCINE_TYPE, TICKET_ORDER } from '@/lib/constants';
import axios from 'axios';
import { bearerToken } from '@/lib/helper';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error500 from '../error/500';

export default function ReevaRegister() {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const history = useHistory();
  const { user } = useAuthState();

  const handleReevaRegister = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      formData.append(`${key}`, data?.[key]);
    }

    toast.promise(
      axios.post('/order_reeva_ticket', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/reeva/payment');
          return 'Berhasil membeli tiket';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  const { data: reevaOrder, error } = useSWR('/my_reeva', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (reevaOrder) {
      if (
        reevaOrder.data.status === 'awaiting_payment' ||
        reevaOrder.data.status === 'need_revision'
      ) {
        history.push(`/reeva/payment`);
      }
      if (
        reevaOrder.data.status === 'active' ||
        reevaOrder.data.status === 'awaiting_verification'
      ) {
        history.push('/reeva');
      }
    }
  }, [reevaOrder, history]);

  if (error && error.response.status !== 404) {
    return <Error500 />;
  }

  if (!reevaOrder && !error) return <Loading />;

  return (
    <div className='w-full bg-black min-h-screen'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <FormProvider {...methods}>
          {/* Loop  */}
          <form
            onSubmit={handleSubmit(handleReevaRegister)}
            className='space-y-4 mt-16'
          >
            <Input
              label={'Nama Lengkap'}
              id={'name'}
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
              id={'email'}
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
              label='NIK'
              id={'nik'}
              validation={{
                required: 'NIK tidak boleh kosong',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message:
                    'NIK harus berupa karakter dan memiliki panjang 16 karakter',
                },
              }}
            />
            <Input
              label='Nomor Telepon atau Whatsapp'
              id={'no_telp'}
              placeholder='+6285123456'
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
              label={'Alamat Tempat Tinggal'}
              id={'alamat'}
              validation={{
                required: 'Alamat tempat tinggal tidak boleh kosong',
                minLength: {
                  value: 16,
                  message:
                    'Alamat tempat tinggal setidaknya memiliki 16 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Alamat domisili maksimal memiliki 128 karakter',
                },
              }}
            />

            <SelectInput2
              label='Darimana kamu mendapat informasi Schematics'
              id='info_sch'
              options={INFO_SCH}
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              placeholder='Pilih asal informasi Schematics'
            />
            <SelectInput
              label='Jumlah Tiket'
              id='ticket'
              options={TICKET_ORDER}
              validation={{
                required: 'Jumlah tiket tidak boleh kosong',
              }}
            />
            <p className='font-secondary text-gray-300'>*Max 1 akun 10 tiket</p>

            <div>
              <SubmitButton
                className='mt-8 bg-reeva font-primary text-white'
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
