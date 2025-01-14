import { useEffect } from 'react';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { bearerToken, numberToRupiah } from '@/lib/helper';
import { useForm, FormProvider } from 'react-hook-form';
import InputPayment from '@/components/InputPayment';
import SubmitButtonPayment from '@/components/SubmitButtonPayment';
import DragnDropInputPayment from '@/components/DragnDropInputPayment';
import SelectInputPayment from '@/components/SelectInputPayment';
import { useHistory, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

import { BANKS } from '@/lib/constants';
export default function PaymentReeva() {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const history = useHistory();
  const { data: reevaPayment, error: reevaPaymentError } = useSWR('/my_reeva');

  const biaya = String(numberToRupiah(reevaPayment?.data?.biaya));
  useEffect(() => {
    if (reevaPayment) {
      if (
        reevaPayment.data.status === 'active' ||
        reevaPayment.data.status === 'awaiting_verification'
      ) {
        history.push('/reeva');
      }
      if (reevaPayment.data.status === 'expired') {
        toast.error(
          'Pembelian anda sebelumnya telah kadaluarsa, silahkan membeli kembali',
        );
        history.push('/reeva/registration');
      }
    }
  }, [reevaPayment]);

  if (reevaPaymentError) {
    if (reevaPaymentError.response.status === 404) {
      history.push('/reeva/registration');
    }
    return <Error500 />;
  }
  if (!reevaPayment && !reevaPaymentError) return <Loading />;

  const handleReevaPayment = (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (['bukti_bayar'].includes(key)) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append('tipe_pembayaran', 'reeva_order');

    toast.promise(
      axios.post('/create_pembayaran', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/reeva');
          return 'Berhasil membuat pembayaran, mohon tunggu verifikasi dari admin';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  return (
    <>
      <main className='w-full min-h-screen bg-nst-black p-2'>
        <div className='flex justify-center items-center flex-col pb-10'>
          {/* Pembayaran */}
          <h1 className='mt-10 text-white font-primary text-5xl md:text-5xl lg:text-7xl'>
            Pembayaran
          </h1>
          <div className='flex justify-center flex-col md:flex-row md:gap-x-3 lg:gap-x-10 mt-10 md:mt-20 pb-4'>
            <div className='flex justify-start items-start md:items-end flex-col p-3'>
              <p className='text-white font-tertiary font-normal  text-sm md:text-base'>
                Lakukan pembayaran dengan nominal
              </p>

              {/* Nominal */}
              <p className=' text-white text-5xl font-primary mt-6 md:mt-12'>
                {biaya.slice(0, biaya.length - 3)}
                <span className='text-reeva underline'>
                  {/* {biaya.slice(7, 11)} */}
                  {biaya.slice(biaya.length - 3, biaya.length)}
                </span>
              </p>
              <p className='font-tertiary font-normal mt-2 text-white text-sm md:text-base'>
                (Nominal <span className='font-bold'>HARUS</span> sesuai hingga
                digit terakhir)
              </p>
              <p className='font-tertiary font-normal mt-6 text-white text-sm md:text-base'>
                Pembayaran melalui scan QRIS Schematics ITS berikut:
              </p>

              {/* Qris */}
              <img
                src={`${process.env.PUBLIC_URL}/images/reeva/qris.jpg`}
                alt='login'
                className='w-44 mt-3'
              ></img>

              <p className='font-tertiary font-normal text-white mt-4 md:mt-6 text-sm md:text-base'>
                QRIS a.n Schematics Reeva 2022
              </p>
            </div>
            <div className='flex justify-start  flex-col p-3'>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleReevaPayment)}>
                  <SelectInputPayment
                    label='Nama Bank'
                    options={BANKS}
                    validation={{ required: 'Nama bank tidak boleh kosong' }}
                    placeholder='Pilih Bank'
                    id='nama_bank'
                  />
                  {/* <InputPayment
                    label='Nama Rekening'
                    id='nama_rekening'
                    validation={{
                      required: 'Nama rekening tidak boleh kosong',
                    }}
                    placeholder='Nama Rekening'
                    readOnly={false}
                  />
                  <InputPayment
                    label='Nomor Rekening'
                    id='no_rekening'
                    validation={{
                      required: 'Nomor rekening tidak boleh kosong',
                      pattern: {
                        value: /^[0-9]{10,}$/,
                        message:
                          'Nomor rekening Harus berupa angka dan memiliki setidaknya 10 karakter',
                      },
                    }}
                    placeholder='Nomor Rekening'
                    readOnly={false}
                  /> */}
                  <DragnDropInputPayment
                    label='Foto atau Bukti Pembayaran'
                    id='bukti_bayar'
                    accept='image/png, image/jpg, image/jpeg'
                    helperText='*File dalam format jpg, png, atau jpeg'
                    maxFiles={1}
                    validation={{
                      required: 'Foto atau Bukti Pembayaran tidak boleh kosong',
                    }}
                  />
                  <SubmitButtonPayment
                    className='mt-12 text-white hover:text-black bg-reeva font-tertiary font-normal '
                    loading={false}
                  >
                    Kirim
                  </SubmitButtonPayment>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
