import { useAuthState } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { bearerToken } from '@/lib/helper';
import { Link, useHistory } from 'react-router-dom';
import { ImFacebook } from 'react-icons/im';
import DashboardShell from '@/layout/DashboardShell';
import Loading from '@/components/Loading';
import Error500 from '../error/500';
import axios from 'axios';
import useSWR from 'swr';

export default function DashboardReeva() {
  const { user } = useAuthState();
  const history = useHistory();

  const { data, error } = useSWR('/my_reeva', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push(`/reeva/payment`);
      }
    }
  }, [data, history]);

  if (error) {
    if (error.response.status === 404) {
      history.push(`/reeva/registration`);
    }
    return <Error500 />;
  }
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      {error?.response.status === 404 ? (
        <div className='bg-dark-100 min-h-screen'>
          <div className='flex flex-col w-full px-4 py-8 font-primary items-center text-white'>
            <p className='text-3xl p-6'>
              Schematics{' '}
              <span className='text-reeva'>
                Revolutionary Entertainments and Expo with Various Arts
              </span>
            </p>
            <p className='text-lg md:w-3/5 w-full text-justify'>
              Schematics{' '}
              <span className='text-reeva'>
                Revolutionary Entertainments and Expo with Various Art 2022
              </span>{' '}
              merupakan penutup dari rangkaian acara Schematics. Schematics
              REEVA ini akan digelar dengan menghadirkan
              <span className='text-reeva'>
                {' '}
                expo dan konser musik dengan talkshow bersama sederet bintang
                tamu.
              </span>{' '}
              Schematics REEVA dapat diikuti oleh masyarakat umum Schematics
              REEVA dapat diakses melalui Youtube.
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              <Link
                to='/reeva/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-reeva hover:bg-reeva-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics REEVA
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <main className='relative z-0 overflow-hidden'>
          {/* Page header */}
          <div className='bg-dark-100 shadow h-max p-2 md:p-4'>
            <div className='flex justify-center md:flex-row flex-col-reverse h-full pt-8 md:gap-x-14 w-full'>
              {/* Biodata  */}
              <div className='w-full flex justify-center md:w-1/2'>
                <div className='w-10/12 h-full bg-white  rounded-3xl md:w-full'>
                  <div className='flex flex-col m-5'>
                    <h2 className='font-primary text-2xl  text-reeva hover:text-reeva-400 md:text-3xl '>
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
                        {data?.data.tickets[0].no_telp}
                      </p>
                    </div>
                    <div className='mt-4 md:text-base text-sm'>
                      <p className='font-secondary'>Tiket</p>
                      <p className='font-secondary font-semibold leading-6'>
                        Presale 1
                      </p>
                    </div>

                    <div className='mt-4 md:text-base text-sm'>
                      <p className='font-secondary'>Jumlah Ticket</p>
                      <p className='font-secondary font-semibold leading-6'>
                        {data?.data.tickets.length}
                      </p>
                    </div>
                    <div className='mt-4 md:text-base text-sm'>
                      <p className='font-secondary'>Venue</p>
                      <p className='font-secondary font-semibold leading-6'>
                        Jatim Expo Surabaya
                      </p>
                    </div>
                    <div className='mt-4 md:text-base text-sm'>
                      <p className='font-secondary'>Status</p>
                      <div className='flex flex-row items-center'>
                        {data?.data.status !== 'active' && (
                          <img
                            src={`${process.env.PUBLIC_URL}/images/nst/mark.svg`}
                            alt='mark'
                            className='mr-2'
                            height={13}
                            width={13}
                          />
                        )}
                        <p
                          className={`font-secondary font-semibold leading-6 ${
                            data?.data.status === 'active'
                              ? 'text-green-500'
                              : 'text-red-500'
                          } hover:text-reeva-400-red`}
                        >
                          {data?.data.status === 'awaiting_payment'
                            ? 'Menunggu pembayaran'
                            : data?.data.status === 'awaiting_verification'
                            ? 'Menunggu verifikasi'
                            : data?.data.status === 'need_revision'
                            ? 'Pembayaran ditolak, silahkan upload ulang'
                            : data?.data.status === 'active'
                            ? 'Pembayaran Terverifikasi'
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
                    <h2 className='font-primary text-xl mt-8 text-reeva  text-center  md:text-3xl'>
                      Tiket
                    </h2>
                    <p className='font-medium mt-3 text-xs text-center md:text-left md:text-lg md:mt-8'>
                      Simpan tiket ini yang akan diperlihatkan di pintu masuk
                      nantinya.
                    </p>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/reeva/ReevaMascot.svg`}
                      className='my-4 h-20 w-20 mx-auto md:h-52 md:w-52 md:my-8 '
                      alt='Reeva Mascot'
                    />

                    {data.data.status === 'active' ? (
                      <Link
                        className=' mb-4 flex justify-center bg-reeva hover:bg-reeva-100 font-primary h-10 rounded-xl w-full text-white hover:text-reeva items-center md:mb-2'
                        href={`${process.env.PUBLIC_URL}/nst/ticket`}
                      >
                        Lihat Tiket Disini
                      </Link>
                    ) : data.data.status === 'awaiting_verification' ? (
                      <p className='mb-4 text-nst-red align-center font-primary'>
                        Tiket sedang dalam proses verifikasi.
                      </p>
                    ) : (
                      <p className='mb-4 text-nst-red align-center font-primary'>
                        Harap melakukan pembayaran terlebih dahulu.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pemberitahuan Card*/}
            <div className='w-full flex justify-center mt-10 pb-20 mb:mx-4 mx-2  '>
              <div className='w-10/12 bg-white h-64 rounded-3xl p-5 overflow-auto'>
                <h2 className='text-reeva font-primary text-3xl leading-9'>
                  Pemberitahuan
                </h2>

                {/* Pemberitahuan Content */}
                {/* <div className='flex flex-col m-5 bg-nst p-3 rounded-2xl '>
                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-col gap-x-10 text-white md:flex-row'>
                      <p className='font-primary text-sm md:text-lg'>
                        24 Juni 2022
                      </p>
                      <p className='font-primary text-sm md:text-lg'>
                        Maintanence Complete
                      </p>
                    </div>

                    <p className='font-primary text-sm text-white md:text-lg'>
                      19.22 WIB
                    </p>
                  </div>

                  <div className='flex flex-col items-center  justify-between mt-2 md:mt-4 md:flex-row'>
                    <p className='font-secondary text-sm md:text-lg  text-white'>
                      Server telah diperbaiki silahkan mengakses dashboard yang
                      tersedia
                    </p>

                    <div className='w-full flex justify-end md:w-min '>
                      <a
                        href='/'
                        className='flex  font-primary text-reeva hover:text-reeva-400 bg-white p-1 rounded-md mt-2 items-center px-2 py-1'
                      >
                        Selengkapnya
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      )}
    </DashboardShell>
  );
}
