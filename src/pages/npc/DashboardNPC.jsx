import Loading from '@/components/Loading';
import DashboardShell from '@/layout/DashboardShell';
import { TEAM_STATUS } from '@/lib/constants';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

function DashboardNPC() {
  const history = useHistory();
  const { data, error } = useSWR('/my_npc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  const showToast = () => {
    toast.error('Pendaftaran sudah ditutup!');

    history.push('/landing');
  };

  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push(`/npc_${data.data.kategori}/payment`);
      }
    }
  }, [data, history]);

  if (error && error.response.status !== 404) return <Error500 />;
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      <Toaster position='top-center' reverseOrder={false} />
      {error?.response.status === 404 ? (
        <div className='bg-white min-h-[calc(100vh-64px)] relative'>
          <div className='flex flex-col w-full px-4 py-8 pt-[6%] font-secondary items-center text-black'>
            <p className='text-5xl p-6 font-bold'>SCHEMATICS NPC</p>
            <p className='text-2xl md:w-4/5 w-full text-center font-normal leading-10'>
              Schematics National Programming Contest 2022 merupakan kompetisi
              pemrograman nasional yang menguji kemampuan penyelesaian suatu
              permasalahan dengan algoritma yang paling efektif dan efisien
              menggunakan program komputer dengan spesifikasi yang telah
              ditentukan.
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              {/* <Link to='/landing' className='w-full flex justify-center'> */}
              <button
                onClick={() => showToast()}
                className='mt-10 bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'
              >
                <p className='text-xl font-bold py-4 px-2'>Daftar Sekarang</p>
              </button>
              {/* </Link> */}
              {/* <Link
                to='/npc_senior/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NPC Senior Sebagai Ketua
                  </p>
                </button>
              </Link>
              <Link
                to='/npc_senior/join_team'
                className='w-full flex justify-center'
              >
                <button className='bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NPC Senior Sebagai Anggota
                  </p>
                </button>
              </Link> */}
            </div>
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/images/npc/npc-left.png`}
            alt=''
            className='absolute bottom-0 -left-16 w-[33%]'
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/npc/npc-mid.png`}
            alt=''
            className='absolute bottom-0 right-[35%] w-[30%]'
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/npc/npc-right.png`}
            alt=''
            className='absolute bottom-0 right-0 w-[30%]'
          />
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
            <p className='cursor-pointer'>Schematics NPC </p>
          </div>
          <div className='md:px-16 px-6 py-16'>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-10'>
              <div className='md:w-1/2 w-full bg-white rounded-lg px-4 pb-4 shadow-xl'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white bg-npc -translate-y-1/2 text-center rounded-lg py-2'>
                  Profil Tim
                </p>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-md md:text-xl'>
                    Schematics NPC
                  </h2>
                  <p className='text-npc hover:text-npc-100 text-xs md:text-sm my-auto cursor-pointer'>
                    Lengkapi data diri
                  </p>
                </div>
                <ul className=' list-inside mb-3'>
                  <div className='grid grid-cols-12 space-y-1 mt-4 text-sm md:text-md'>
                    <li className='col-span-5'>Nama Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.nama_team}</p>
                    <li className='col-span-5'>Nama Ketua Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.members[0].name}</p>
                    <li className='col-span-5'>Asal Sekolah</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.asal_sekolah}</p>
                    <li className='col-span-5'>Kota / Kabupaten</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.kota}</p>
                    <li className='col-span-5'>Kategori</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {data.data.kategori.toUpperCase()}
                    </p>
                    <li className='col-span-5'>Guru Pendamping (GP)</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {data.data.nama_guru_pendamping}
                    </p>
                    <li className='col-span-5'>No. Telepon GP</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {data.data.no_telp_guru_pendamping}
                    </p>
                    <li className='col-span-5'>Status Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {TEAM_STATUS[data.data.status]}
                    </p>
                  </div>
                </ul>
                <hr />
                {data.data.status === 'active' && (
                  <div className='flex justify-start text-green-500'>
                    <p className='text-sm mt-4 flex my-auto'>
                      <AiOutlineCheckCircle className='w-5 h-4 mx-2 my-auto' />
                      Akun tim anda telah aktif
                    </p>
                  </div>
                )}
              </div>

              <div className='md:w-5/12 w-full shadow-xl pb-4'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white -translate-y-1/2 bg-npc text-center rounded-lg py-2 ml-4'>
                  Link Penting
                </p>
                <div className='w-11/12 mx-auto'>
                  <div className='flex justify-between'>
                    <p className='font-bold text-md md:text-xl'>
                      Kode Afiliasi :
                      <span>&nbsp; {data.data.referral_code}</span>
                    </p>
                    <a
                      href={
                        data.data.kategori === 'senior'
                          ? 'https://drive.google.com/file/d/1zMvXQ3_GvcOHd2BsJ5p3DVPBmIgJS5Y9/view?usp=sharing'
                          : 'https://drive.google.com/file/d/1aagSVYQUoxqBj34OF0fLZ_Xrd5EWhrGl/view?usp=sharing'
                      }
                      target='_blank'
                      rel='noreferrer'
                    >
                      <p className='text-npc hover:text-npc-100 text-xs md:text-sm my-auto'>
                        Unduh GuideBook
                      </p>
                    </a>
                  </div>
                  {data.data.status === 'active' && (
                    <ul className='list-inside'>
                      <div className='grid grid-cols-12 text-sm md:text-md mt-4'>
                        <li className='col-span-5'>Link Grup Discord</li>
                        <p>:</p>
                        <p className='col-span-6'>
                          <a
                            className='text-npc hover:text-npc-300'
                            href='https://discord.gg/amvajPDkVf'
                          >
                            Disini
                          </a>
                        </p>
                        <li className='col-span-5'>Link Penyisihan</li>
                        <p>:</p>
                        <p className='col-span-6'>
                          <a
                            className='text-npc hover:text-npc-300'
                            href='https://bit.ly/A_TnP_2021_Penyisihan'
                          >
                            Disini
                          </a>
                        </p>
                      </div>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className='w-full md:h-64 h-96 bg-white px-6 pb-6 mt-16 rounded-xl shadow-xl'>
              <p className='md:w-1/5 text-xl bg-npc py-2 rounded-lg font-medium text-center md:text-center text-white -translate-y-1/2'>
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
        </div>
      )}
    </DashboardShell>
  );
}

export default DashboardNPC;
