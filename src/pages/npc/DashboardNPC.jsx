import Loading from '@/components/Loading';
import DashboardShell from '@/layout/DashboardShell';
import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

function DashboardNPC() {
  const { data, error } = useSWR('/my_npc');

  if (error && error.response.status !== 404) return <Error500 />;
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      {error?.response.status === 404 ? (
        <div className='bg-dark-100 min-h-screen'>
          <div className='flex flex-col w-full px-4 py-8 font-primary items-center text-white'>
            <p className='text-3xl p-6'>
              Schematics{' '}
              <span className='text-npc'>National Programming Contest</span>
            </p>
            <p className='text-lg md:w-3/5 w-full text-justify'>
              Schematics{' '}
              <span className='text-npc'>National Programming Contest</span>{' '}
              2022 merupakan kompetisi pemrograman nasional yang menguji
              kemampuan penyelesaian suatu permasalahan dengan{' '}
              <span className='text-npc'>algoritma</span> yang paling efektif
              dan efisien menggunakan{' '}
              <span className='text-npc'>program komputer</span> dengan
              spesifikasi yang telah ditentukan. Schematics{' '}
              <span className='text-npc'>NPC Junior</span> dapat diikuti oleh{' '}
              <span className='text-npc'>
                siswa SMA/Sederajat secara perorangan
              </span>{' '}
              dan <span className='text-npc'>Schematics NPC Senior</span> dapat
              diikuti oleh{' '}
              <span className='text-npc'>
                tim beranggotakan maksimal 3 mahasiswa
              </span>
              .
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              <Link
                to='/npc_junior/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NPC Junior
                  </p>
                </button>
              </Link>
              <Link
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
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-dark-100 py-8'>
          <div className='md:px-16 px-6'>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-3'>
              <div className='md:w-7/12 w-full bg-white rounded-lg p-4'>
                <p className='text-3xl font-bold text-left text-npc'>
                  Profil Tim
                </p>
                <ul className='list-disc list-inside'>
                  <div className='grid grid-cols-12 grid-rows-6 space-y-3 mt-4 text-lg'>
                    <li className='col-span-5'>Nama Tim</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.nama_team}
                    </p>
                    <li className='col-span-5'>Asal Sekolah</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.asal_sekolah}
                    </p>
                    <li className='col-span-5'>Kota/Kabupaten</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>{data.data.kota}</p>
                    <li className='col-span-5'>Kategori</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.kategori.toUpperCase()}
                    </p>
                    <li className='col-span-5'>Guru Pendamping (GP)</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.nama_guru_pendamping}
                    </p>
                    <li className='col-span-5'>No. Telepon GP</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.no_telp_guru_pendamping}
                    </p>
                  </div>
                </ul>
              </div>
              <div className='md:w-5/12 w-full grid grid-rows-6 md:pl-8 pl-0 space-y-3'>
                <div className='w-full row-span-4 bg-white py-4 px-2 rounded-lg'>
                  <div>
                    <p className='text-3xl font-bold text-left text-npc'>
                      Ketua Tim
                    </p>
                    {data.data.members.map((member, index) => {
                      if (member.member_type === 'ketua') {
                        return (
                          <p className='mt-1 font-bold' key={index}>
                            {member.name}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div className='mt-2'>
                    <p className='text-3xl font-bold text-left text-npc'>
                      Anggota Tim
                    </p>
                    <ul className='space-y-1 mt-1 font-bold'>
                      {data.data.members.map((member, index) => {
                        if (member.member_type === 'anggota') {
                          return <li key={index}>{member.name}</li>;
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className='w-full bg-white rounded-lg flex justify-center items-center'>
                  <p className='text-xl font-bold py-4 px-2'>
                    {`Kode Afiliasi: ${data.data.referral_code}`}
                  </p>
                </div>
                <Link to='/landing'>
                  <button className='w-full h-full bg-white hover:bg-npc-200 rounded-lg flex justify-center items-center'>
                    <p className='text-xl font-bold py-4 px-2'>
                      Unduh Guidebook
                    </p>
                  </button>
                </Link>
              </div>
            </div>
            <div className='w-full md:h-64 h-96 bg-white p-6 mt-8 rounded-xl'>
              <p className='text-3xl font-bold text-center md:text-left text-npc'>
                Pemberitahuan
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default DashboardNPC;
