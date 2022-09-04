import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import SelectInput from '@/components/SelectInput';
import SubmitButton from '@/components/SubmitButton';
import { BANKS } from '@/lib/constants';
import { bearerToken, numberToRupiah } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast, { useToaster } from 'react-hot-toast';
import { Redirect, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

export default function PaymentTeam() {
  const methods = useForm();
  const history = useHistory();
  const { handleSubmit } = methods;
  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_nlc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (teamPayment) {
      if (
        teamPayment.data.status === 'active' ||
        teamPayment.data.status === 'awaiting_verification'
      ) {
        history.push('/landing');
      }
    }
  }, [teamPayment]);

  if (teamPaymentError) {
    if (teamPaymentError.response.status === 404) {
      // toast.error("Anda belum mendaftarkan tim Schematics NLC");
      return <Redirect to={'/nlc/registration'} />;
    }
    return <Error500 />;
  }
  if (!teamPayment) return <Loading />;

  const handlePaymentTeam = (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (['bukti_bayar'].includes(key)) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append('tipe_pembayaran', 'nlc_team');
    toast.promise(
      axios.post('/create_pembayaran', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/landing');
          return 'Berhasil membuat pembayaran, mohon tunggu verifikasi dari admin';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  return (
    <div className='w-full bg-dark-400 min-h-screen'>
      <div className='md:w-5/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Pembayaran
        </p>
        <div className='flex md:flex-row flex-col justify-center mt-16'>
          <div className='px-4 py-8 text-center md:text-right text-white flex flex-col items-center md:items-end'>
            <p>Lakukan Pembayaran dengan nominal</p>
            <br />
            <p className='font-primary text-3xl md:text-5xl'>
              {numberToRupiah(teamPayment.data.biaya)}
            </p>
            <br />
            <p>(Nominal HARUS sesuai hingga digit terakhir)</p>

            {/* Qris */}
            <p className='font-tertiary font-normal mt-6 text-white text-sm md:text-base'>
              Pembayaran melalui scan QRIS Schematics ITS berikut:
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/images/nst/qris.png`}
              alt='login'
              className='w-56 mt-3'
            ></img>

            <p className='font-tertiary font-normal text-white mt-4 md:mt-6 text-sm md:text-base'>
              Atau melalui rekening berikut:
            </p>
            <p className='font-tertiary font-normal text-white mt-1 text-sm md:text-base'>
              1300018840515 (Bank Mandiri a.n ZAHRA FAYYADIYATI)
            </p>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handlePaymentTeam)}
              className='space-y-4 py-8 px-4'
            >
              <SelectInput
                label='Nama Bank'
                options={BANKS}
                validation={{
                  required: 'Nama bank tidak boleh kosong',
                }}
                placeholder='Pilih bank pilihan anda'
                id='nama_bank'
              />
              <DragnDropInput
                label='Foto atau bukti pembayaran'
                id='bukti_bayar'
                accept='image/png, image/jpg, image/jpeg'
                helperText='File dalam format jpg, png, atau jpeg'
                maxFiles={1}
                validation={{
                  required: 'Bukti pembayaran tidak boleh kosong',
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
    </div>
  );
}
