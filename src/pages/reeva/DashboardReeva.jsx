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
import UnstyledLink from '@/components/UnstyledLink';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';

export default function DashboardReeva() {
  const { user } = useAuthState();
  const history = useHistory();

  const { data, error } = useSWR('/my_reeva');

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

  if (error && error.response.status !== 404) {
    return <Error500 />;
  }
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      {error?.response.status === 404 ? (
        <div className=' min-h-[calc(100vh-64px)] relative flex justify-center bg-white'>
          <div className='z-50 relative mx-16 text-center font-secondary'>
            <div className='flex gap-x-2 font-medium text-[#24657A]'>
              <a href='/landing'>
                <p className='hover:text-gray-200'>Dashboard Peserta</p>
              </a>
              <p> &gt; </p>
              <p className='cursor-pointer'>Event</p>
              <p> &gt; </p>
              <p className='cursor-pointer'>Schematics Reeva</p>
            </div>
            <div className='mt-[8%]'>
              <h1 className='font-bold text-4xl'>SCHEMATICS REEVA</h1>
              <p className='mt-5 leading-[180%] text-xl w-4/5 mx-auto'>
                Schematics Revolutionary Entertainments and Expo with Various
                Art 2022 merupakan penutup dari rangkaian acara Schematics.
                Schematics REEVA ini akan digelar dengan menghadirkan expo dan
                konser musik.
              </p>
            </div>
            <div className='mt-20'>
              <Link to='/reeva/registration'>
                <button className='bg-reeva-400 px-4 py-2 text-white font-bold text-lg w-[480px] rounded-lg'>
                  <p>Daftar Sekarang</p>
                </button>
              </Link>
            </div>
          </div>
          {/* Images Guest Start */}
          <div className='absolute bottom-0 z-0'>
            <img
              src={`${process.env.PUBLIC_URL}/images/reeva/guest-star.png`}
              alt='Guest Star'
              className='bg-cover w-screen'
            />
          </div>
          {/* Petir */}
          <div className='absolute top-8 left-10 z-0'>
            <img
              src={`${process.env.PUBLIC_URL}/images/reeva/petir.png`}
              alt='Petir'
            />
          </div>
          <div className='absolute top-10 right-3 z-0 rotate-45'>
            <img
              src={`${process.env.PUBLIC_URL}/images/reeva/petir.png`}
              alt='Petir'
            />
          </div>
        </div>
      ) : (
        <div className='bg-white py-4 min-h-screen font-secondary'>
          <div className='text-xs md:px-16 px-6 flex gap-x-2 font-medium text-[#24657A]'>
            <a href='/landing'>
              <p className='hover:text-gray-200'>Dashboard Peserta</p>
            </a>
            <p> &gt; </p>
            <p className='cursor-pointer'>Event</p>
            <p> &gt; </p>
            <p className='cursor-pointer'>Schematics REEVA</p>
          </div>
          <div className='md:px-16 px-6 py-16'>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-10'>
              <div className='md:w-1/2 w-full bg-white rounded-lg px-4 pb-4 shadow-xl'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white bg-reeva -translate-y-1/2 text-center rounded-lg py-2'>
                  Profil
                </p>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-md md:text-xl'>
                    Schematics REEVA
                  </h2>
                  <p className='text-reeva hover:text-reeva-100 text-xs md:text-sm my-auto cursor-pointer'>
                    Lengkapi data diri &gt;
                  </p>
                </div>
                <ul className=' list-inside mb-6'>
                  <div className='grid grid-cols-12 space-y-1 mt-4 text-sm md:text-md'>
                    <li className='col-span-5'>Nama</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].name}</p>
                    <li className='col-span-5'>Alamat</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].alamat}</p>
                    <li className='col-span-5'>No Telepon</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].no_telp}</p>
                  </div>
                </ul>
                <hr />
                {data.data.status === 'active' ? (
                  <div className='flex justify-start text-green-500'>
                    <p className='text-sm mt-4 flex my-auto'>
                      <AiOutlineCheckCircle className='w-5 h-4 mx-2 my-auto' />
                      Akun anda telah aktif
                    </p>
                  </div>
                ) : (
                  <div className='flex justify-start'>
                    <p className='flex text-sm mt-4 my-auto text-black'>
                      <AiOutlineWarning className='w-5 h-4 mx-2 my-auto text-red-500' />
                      Lakukan Pembayaran untuk mengaktifkan akun anda
                    </p>
                  </div>
                )}
              </div>

              <div className='md:w-5/12 w-full shadow-xl rounded-lg pb-4'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white -translate-y-1/2 bg-reeva text-center rounded-lg py-2 ml-4'>
                  Ticket
                </p>
                <div className='w-11/12 mx-auto'>
                  <div className='flex justify-between'>
                    <p className='font-bold text-md md:text-xl'>
                      Ticket Schematics REEVA
                    </p>
                    {data.data.status === 'active' ? (
                      <div></div>
                    ) : (
                      <a href='/reeva/payment' target='_blank' rel='noreferrer'>
                        <p className='text-reeva hover:text-reeva-100 text-xs md:text-sm my-auto'>
                          Upload Bukti Pembayaran &gt;
                        </p>
                      </a>
                    )}
                  </div>
                  <ul className='list-inside mb-4'>
                    <div className='grid grid-cols-12 text-sm md:text-md mt-4 gap-y-1'>
                      <li className='col-span-5'>Jumlah Ticket</li>
                      <p>:</p>
                      <p className='col-span-6'>{data.data.tickets.length}</p>
                      <li className='col-span-5'>Tanggal Acara</li>
                      <p>:</p>
                      <p className='col-span-6'>22 November 2022</p>
                      <li className='col-span-5'>Venue</li>
                      <p>:</p>
                      <p className='col-span-6'>
                        Surabaya Community Center, Marvel City
                      </p>
                    </div>
                  </ul>
                  <hr />
                  <p
                    className={`font-secondary text-sm leading-6 flex pt-2 ${
                      data?.data.status === 'active'
                        ? 'text-green-500'
                        : 'text-black'
                    } hover:text-reeva-400-red`}
                  >
                    {data?.data.status === 'awaiting_payment' ||
                    data?.data.status === 'awaiting_verification' ||
                    data?.data.status === 'need_revision' ? (
                      <AiOutlineWarning className='w-5 h-4 mx-2 my-auto text-red-500' />
                    ) : (
                      <AiOutlineCheckCircle className='w-5 h-4 mx-2 my-auto' />
                    )}
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
            <div className='w-full md:h-64 h-96 bg-white px-6 pb-6 mt-16 rounded-xl shadow-xl'>
              <p className='md:w-1/5 text-xl bg-reeva py-2 rounded-lg font-medium text-center md:text-center text-white -translate-y-1/2'>
                Pemberitahuan
              </p>
              <ul className='list-disc list-inside mt-2 font-medium text-lg'>
                <li>
                  Untuk tim yang berstatus aktif, mohon untuk segera masuk ke
                  link discord yang tertera pada dashboard
                </li>
              </ul>
            </div>
          </div>
          {data.data.status === 'active' ? (
            <UnstyledLink
              href={`${process.env.PUBLIC_URL}/reeva/ticket`}
              className=''
              openNewTab={false}
            >
              <div className='text-center bg-reeva rounded-lg w-1/3 py-4 mx-auto text-white font-bold text-xl hover:bg-reeva-300 cursor-pointer'>
                Unduh Tiket
              </div>
            </UnstyledLink>
          ) : (
            ''
          )}
        </div>
        // <main className='relative z-0 overflow-hidden'>
        //   {/* Page header */}
        //   <div className='bg-white shadow h-max p-2 md:p-4'>
        //     <div className='flex justify-center md:flex-row flex-col-reverse h-full pt-8 md:gap-x-14 w-full'>
        //       {/* Biodata  */}
        //       <div className='w-full flex justify-center md:w-1/2'>
        //         <div className='w-10/12 h-full bg-white  rounded-3xl md:w-full'>
        //           <div className='flex flex-col m-5'>
        //             <h2 className='font-primary text-2xl  text-reeva hover:text-reeva-400 md:text-3xl '>
        //               Informasi Pembeli
        //             </h2>
        //             {/* Nama */}
        //             <div className='mt-8 md:text-base text-sm'>
        //               <p className='font-secondary'>Nama</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 {data?.data?.tickets[0]?.name}
        //               </p>
        //             </div>
        //             {/* Alamat */}
        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>Alamat</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 {data?.data?.tickets[0]?.alamat}
        //               </p>
        //             </div>
        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>No. Telp</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 {data?.data?.tickets[0]?.no_telp}
        //               </p>
        //             </div>
        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>Tiket</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 {data?.data?.jenis_tiket}
        //               </p>
        //             </div>

        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>Jumlah Ticket</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 {data?.data?.tickets?.length}
        //               </p>
        //             </div>
        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>Venue</p>
        //               <p className='font-secondary font-semibold leading-6'>
        //                 Jatim Expo Surabaya
        //               </p>
        //             </div>
        //             <div className='mt-4 md:text-base text-sm'>
        //               <p className='font-secondary'>Status</p>
        //               <div className='flex flex-row items-center'>
        //                 {data?.data.status !== 'active' && (
        //                   <img
        //                     src={`${process.env.PUBLIC_URL}/images/nst/mark.svg`}
        //                     alt='mark'
        //                     className='mr-2'
        //                     height={13}
        //                     width={13}
        //                   />
        //                 )}
        //                 <p
        //                   className={`font-secondary font-semibold leading-6 ${
        //                     data?.data.status === 'active'
        //                       ? 'text-green-500'
        //                       : 'text-red-500'
        //                   } hover:text-reeva-400-red`}
        //                 >
        //                   {data?.data.status === 'awaiting_payment'
        //                     ? 'Menunggu pembayaran'
        //                     : data?.data.status === 'awaiting_verification'
        //                     ? 'Menunggu verifikasi'
        //                     : data?.data.status === 'need_revision'
        //                     ? 'Pembayaran ditolak, silahkan upload ulang'
        //                     : data?.data.status === 'active'
        //                     ? 'Pembayaran Terverifikasi'
        //                     : ''}
        //                 </p>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Tiket */}
        //       <div className='mb-8 w-full  flex  justify-center md:block md:w-1/4 md:mb-0'>
        //         <div className=' bg-white w-10/12 rounded-3xl h-full md:w-full'>
        //           <div className='mx-5 flex flex-col justify-center'>
        //             <h2 className='font-primary text-xl mt-8 text-reeva  text-center  md:text-3xl'>
        //               Tiket
        //             </h2>
        //             <p className='font-medium mt-3 text-xs text-center md:text-left md:text-lg md:mt-8'>
        //               Simpan tiket ini yang akan diperlihatkan di pintu masuk
        //               nantinya.
        //             </p>
        //             <img
        //               src={`${process.env.PUBLIC_URL}/images/reeva/ReevaMascot.svg`}
        //               className='my-4 h-20 w-20 mx-auto md:h-52 md:w-52 md:my-8 '
        //               alt='Reeva Mascot'
        //             />

        //             {data.data.status === 'active' ? (
        //               <UnstyledLink
        //                 className=' mb-4 flex justify-center bg-reeva hover:bg-reeva-100 font-primary h-10 rounded-xl w-full text-white hover:text-reeva items-center md:mb-2'
        //                 href={`${process.env.PUBLIC_URL}/reeva/ticket`}
        //                 openNewTab={false}
        //               >
        //                 Lihat Tiket Disini
        //               </UnstyledLink>
        //             ) : data.data.status === 'awaiting_verification' ? (
        //               <p className='mb-4 text-nst-red align-center font-primary'>
        //                 Tiket sedang dalam proses verifikasi.
        //               </p>
        //             ) : (
        //               <p className='mb-4 text-nst-red align-center font-primary'>
        //                 Harap melakukan pembayaran terlebih dahulu.
        //               </p>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     {/* Pemberitahuan Card*/}
        //     <div className='w-full flex justify-center mt-10 pb-20 mb:mx-4 mx-2  '>
        //       <div className='w-10/12 bg-white h-64 rounded-3xl p-5 overflow-auto'>
        //         <h2 className='text-reeva font-primary text-3xl leading-9'>
        //           Pemberitahuan
        //         </h2>

        //         {/* Pemberitahuan Content */}
        //         <div className='flex flex-col m-5 bg-nst p-3 rounded-2xl '>
        //           <div className='flex flex-row justify-between'>
        //             <div className='flex flex-col gap-x-10 text-white md:flex-row'>
        //               <p className='font-primary text-sm md:text-lg'>
        //                 10 September 2022
        //               </p>
        //               <p className='font-primary text-sm md:text-lg'>
        //                 Pengiriman Tiket Reeva
        //               </p>
        //             </div>
        //           </div>

        //           <div className='flex flex-col items-center  justify-between mt-2 md:mt-4 md:flex-row'>
        //             <p className='font-secondary text-sm md:text-lg  text-white'>
        //               Tiket akan dikirim melalui email pembeli dan dapat diakses
        //               melalui dashboard pembeli setelah diverifikasi
        //               pembayarannya oleh admin
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </main>
      )}
    </DashboardShell>
  );
}
