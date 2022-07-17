import DashboardShell from '@/layout/DashboardShell';
import React from 'react';
import { Link } from 'react-router-dom';

function GeneralEventDashboard() {
  return (
    <DashboardShell>
      <div className='bg-black min-h-screen py-8'>
        <div className='md:px-16 px-6'>
          <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-3'>
            <div className='w-7/12 bg-npc rounded-lg text-white p-4'>
              <p className='text-3xl font-bold text-left'>Profil Tim</p>
              <ul className='list-disc list-inside'>
                <div className='grid grid-cols-12 grid-rows-6 space-y-2 mt-4'>
                  <li className='col-span-6'>Nama Tim</li>
                  <p>:</p>
                  <p className='col-span-5'>Lumino</p>
                  <li className='col-span-6'>Asal Sekolah</li>
                  <p>:</p>
                  <p className='col-span-5'>Lumino</p>
                  <li className='col-span-6'>Provinsi</li>
                  <p>:</p>
                  <p className='col-span-5'>Jawa Timur</p>
                  <li className='col-span-6'>Region</li>
                  <p>:</p>
                  <p className='col-span-5'>Kediri</p>
                  <li className='col-span-6'>Guru Pendamping (GP)</li>
                  <p>:</p>
                  <p className='col-span-5'>Mustain</p>
                  <li className='col-span-6'>No. Telepon GP</li>
                  <p>:</p>
                  <p className='col-span-5'>+6282244607846</p>
                </div>
              </ul>
            </div>
            <div className='w-5/12 grid grid-rows-6 text-white pl-8 space-y-3'>
              <div className='w-full row-span-4 bg-npc py-4 px-2 rounded-lg'>
                <div>
                  <p className='text-3xl font-bold text-left'>Ketua Tim</p>
                  <p className='mt-1'>Christian Kevin Emor</p>
                </div>
                <div className='mt-2'>
                  <p className='text-3xl font-bold text-left'>Anggota Tim</p>
                  <ul className='space-y-1 mt-1'>
                    <li>Ahmad Ashari</li>
                    <li>Mohammad Tohari</li>
                  </ul>
                </div>
              </div>
              <div className='w-full bg-npc rounded-lg flex justify-center items-center'>
                <p className='text-white text-1xl font-bold'>
                  Kode Afiliasi: 123456
                </p>
              </div>
              <Link to='/landing'>
                <button className='w-full h-full bg-npc rounded-lg flex justify-center items-center'>
                  <p className='text-1xl font-bold'>Unduh Guidebook</p>
                </button>
              </Link>
            </div>
          </div>
          <div className='w-full md:h-64 h-96 bg-npc p-6 mt-8 rounded-xl'>
            <p className='text-3xl font-bold text-center md:text-left text-white'>
              Pemberitahuan
            </p>
            {/* <div>
              <ul className='list-disc list-inside text-lg'>
                <li>Pembayaran lo kocak</li>
                <li>Pembayaran lo kocak</li>
                <li>Pembayaran lo kocak</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default GeneralEventDashboard;
