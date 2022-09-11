import DragnDropInput from '@/components/DragnDropInput';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import SelectInput2 from '@/components/SelectInput2';
import SelectInput from '@/components/SelectInput';
import SubmitButton from '@/components/SubmitButton';
import SubmitButtonPayment from '@/components/SubmitButtonPayment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '@/contexts/AuthContext';
import { useForm, FormProvider } from 'react-hook-form';
import { INFO_SCH } from '@/lib/constants';
import axios from 'axios';
import { bearerToken, getTicketOption } from '@/lib/helper';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error500 from '../error/500';

export default function ReevaRegister() {
  const methods = useForm();
  const { control, watch, handleSubmit } = methods;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { user } = useAuthState();
  const kode_voucher = watch('kode_voucher');
  const jumlah_tiket = watch('jumlah_tiket');

  const handleCheckKode = async () => {
    if (!kode_voucher) {
      return toast.error('Anda belum mengisi form kode promo');
    }
    if (!jumlah_tiket) {
      return toast.error('Anda belum mengisi jumlah tiket yang ingin dipesan');
    }
    toast.promise(
      axios.post(
        '/check_voucher',
        {
          kode: kode_voucher,
          region: 0,
          tipe: 'reeva',
          jumlah: jumlah_tiket,
        },
        {
          headers: { ...bearerToken() },
        },
      ),
      {
        loading: 'Loading...',
        success: 'Kode promo dapat digunakan',
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

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

  const { data: reevaOrder, error } = useSWR('/my_reeva');

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
              defaultValue={user.name}
              validation={{
                required: 'Nama lengkap tidak boleh kosong',
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
              defaultValue={user.no_telp}
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

            <div className='w-full space-y-2'>
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
                  className='flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-light-700 font-primary bg-reeva'
                >
                  Cek Kode
                </button>
              </div>
            </div>

            <SelectInput2
              label='Darimana kamu mendapat informasi Schematics?'
              id='info_sch'
              options={INFO_SCH}
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              placeholder='Pilih asal informasi Schematics'
            />
            <SelectInput
              label='Jumlah Tiket'
              id='jumlah_tiket'
              options={getTicketOption(10)}
              validation={{
                required: 'Jumlah tiket tidak boleh kosong',
              }}
            />
            <p className='font-secondary text-gray-300'>*Max 1 akun 10 tiket</p>

            <SubmitButtonPayment
              className='mt-12 text-white hover:text-black bg-reeva font-tertiary font-normal '
              loading={false}
            >
              Beli Tiket
            </SubmitButtonPayment>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
