import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import { useState, useEffect } from 'react';
import { bearerToken } from '@/lib/helper';
import Loading from '@/components/Loading';
import Error500 from '../error/500';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import { ImFacebook } from 'react-icons/im';

export default function Dashboard() {
  const { user } = useAuthState();
  const history = useHistory();

  const { data, error } = useSWR('/my_nst', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push(`/nst/payment`);
      }
    }
  }, [data, history]);

  if (error && error.response.status !== 404) return <Error500 />;
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      <main className='relative z-0 overflow-hidden'>
        {/* Page header */}
        <div className='bg-dark shadow h-max p-2 md:p-4'>
          <div className='flex justify-center md:flex-row flex-col-reverse h-full pt-8 md:gap-x-14 w-full'>
            {/* Biodata  */}
            <div className='w-full flex justify-center md:w-1/2'>
              <div className='w-10/12 h-full bg-white  rounded-3xl md:w-full'>
                <div className='flex flex-col m-5'>
                  <h2 className='font-primary text-2xl  text-nst-blue md:text-3xl '>
                    Informasi Pembeli
                  </h2>
                  {/* Nama */}
                  <div className='mt-8 md:text-base text-sm'>
                    <p className='font-secondary'>Nama</p>
                    <p className='font-secondary font-semibold leading-6'>
                      {data.data.tickets[0].name}
                    </p>
                  </div>
                  {/* Alamat */}
                  <div className='mt-4 md:text-base text-sm'>
                    <p className='font-secondary'>Alamat</p>
                    <p className='font-secondary font-semibold leading-6'>
                      {data.data.tickets[0].alamat}
                    </p>
                  </div>
                  <div className='mt-4 md:text-base text-sm'>
                    <p className='font-secondary'>No. Telp</p>
                    <p className='font-secondary font-semibold leading-6'>
                      {data.data.tickets[0].no_telp}
                    </p>
                  </div>

                  <div className='mt-4 md:text-base text-sm'>
                    <p className='font-secondary'>Jumlah Ticket</p>
                    <p className='font-secondary font-semibold leading-6'>
                      {data.data.tickets.length}
                    </p>
                  </div>
                  <div className='mt-4 md:text-base text-sm'>
                    <p className='font-secondary'>Venue</p>
                    <p className='font-secondary font-semibold leading-6'>
                      Tunjungan Plaza 8, Surabaya
                    </p>
                  </div>
                  <div className='mt-4 md:text-base text-sm'>
                    <p className='font-secondary'>Status</p>
                    <div className='flex flex-row items-center'>
                      <img
                        src='/images/nst/mark.svg'
                        alt='mark'
                        className='mr-2'
                        height={13}
                        width={13}
                      />
                      <p className='font-secondary font-semibold leading-6 text-nst-red'>
                        {data.data.status === 'awaiting_payment'
                          ? 'menunggu pembayaran'
                          : data.data.status === 'awaiting_verification'
                          ? 'menunggu verifikasi'
                          : data.data.status === 'need_revision'
                          ? 'pembayaran ditolak, silahkan upload ulang'
                          : data.data.status === 'active'
                          ? 'pembayaran terverifikasi'
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tiket */}
            <div className='mb-8 w-full  flex  justify-center md:block md:w-1/4 md:mb-0'>
              <div className=' bg-white w-10/12 rounded-3xl h-full md:w-full'>
                <div className='mx-5 flex flex-col justify-center'>
                  <h2 className='font-primary text-xl mt-8 text-nst-blue text-center  md:text-3xl'>
                    Tiket
                  </h2>
                  <p className='font-medium mt-3 text-xs text-center md:text-left md:text-lg md:mt-8'>
                    Simpan tiket ini yang akan diperlihatkan di pintu masuk
                    nantinya.
                  </p>
                  <img
                    src='/images/nst/assetNST3.svg'
                    className='my-4 h-20 w-20 mx-auto md:h-52 md:w-52 md:my-8 '
                    alt='Alien'
                  />

                  <a
                    className=' mb-4 flex justify-center bg-nst-blue font-primary h-10 rounded-xl w-full text-white items-center md:mb-2'
                    href='/'
                  >
                    Lihat Tiket Disini
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pemberitahuan Card*/}
          <div className='w-full flex justify-center mt-10 pb-20 mb:mx-4 mx-2  '>
            <div className='w-10/12 bg-white h-64 rounded-3xl p-5 overflow-auto'>
              <h2 className='text-nst-blue font-primary text-3xl leading-9'>
                Pemberitahuan
              </h2>

              {/* Pemberitahuan Content */}
              <div className='flex flex-col m-5 bg-nst-blue p-3 rounded-2xl '>
                {/* Header Card */}
                <div className='flex flex-row justify-between'>
                  {/* Tangal dan Status */}
                  <div className='flex flex-col gap-x-10 text-white md:flex-row'>
                    <p className='font-primary text-sm md:text-lg'>
                      24 Juni 2022
                    </p>
                    <p className='font-primary text-sm md:text-lg'>
                      Maintanence Complete
                    </p>
                  </div>
                  {/* Waktu */}
                  <p className='font-primary text-sm text-white md:text-lg'>
                    19.22 WIB
                  </p>
                </div>

                {/* Content Card */}
                <div className='flex flex-col items-center  justify-between mt-2 md:mt-4 md:flex-row'>
                  {/* Message */}
                  <p className='font-secondary text-sm md:text-lg  text-white'>
                    Server telah diperbaiki silahkan mengakses dashboard yang
                    tersedia
                  </p>

                  {/* Selengkapnya */}
                  <div className='w-full flex justify-end md:w-min '>
                    <a
                      href='/'
                      className='flex  font-primary text-nst-blue bg-white p-1 rounded-md w-28 mt-2 h-6 items-center'
                    >
                      Selengkapnya
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
