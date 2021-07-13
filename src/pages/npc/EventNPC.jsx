import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  HiClipboardCheck,
  HiFire,
  HiUser,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

import CenteredAccordion from '@/components/CenteredAccordion';
import HorizontalTimeline from '@/components/HorizontalTimeline';
import Modal from '@/components/Modal';
import TeamDetail from '@/components/TeamDetail';
import TeamMemberDetail from '@/components/TeamMemberDetail';
import { useAuthState } from '@/contexts/AuthContext';
import { useTeamDispatch } from '@/contexts/TeamContext';
import DashboardShell from '@/layout/DashboardShell';
import { bearerToken } from '@/lib/helper';

export default function EventNPC() {
  const [open, setOpen] = useState(false);
  /* ------ FALSE TO SHOW DETAIL TEAM ---- */
  const npc = true;
  const [loading, setLoading] = useState(true);

  const { user } = useAuthState();
  // const { npc } = useTeamState();
  const dispatch = useTeamDispatch();

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await axios.post(
          '/npc/team/find',
          { team_id: user.team[0].npc },
          {
            headers: { ...bearerToken() },
          },
        );

        console.log(res.data.data);

        dispatch('STORE_NPC', res.data.data);
      } catch (err) {
        console.log(err.response.data);
        toast.error('Gagal mengambil data tim!');
      } finally {
        setLoading(false);
      }
    };

    if (user?.team?.[0]?.npc) {
      loadTeam();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTeam = {
    name: 'Doa ibu' ?? npc?.nama_tim,
    school: 'SMAN 1 SURABAYA' ?? npc?.asal_sekolah,
    region: 'SURABAYA' ?? npc?.region,
    city: 'SURABAYA' ?? npc?.kota,
    province: 'SURABAYA' ?? npc?.provinsi,
    // password: `schnlc${npc?.anggota[1].nama}`,
    payment:
      npc?.status_pembayaran === null
        ? '-'
        : npc?.status_pembayaran === false
        ? 'Sedang Diverifikasi'
        : 'Lunas',
    phase: npc?.tahapan ?? '-',
  };

  const dataTeamMemberJunior = [
    {
      title: 'Ketua Tim',
      name: 'Tsani' ?? npc?.anggota[1].nama,
      email: 'tsani@mail.com' ?? npc?.anggota[1].email,
      nisn: '3213131' ?? npc?.anggota[1].nisn,
      phone: '089123123' ?? npc?.anggota[1].nomor_telepon,
      line: 'tsani' ?? npc?.anggota[1].id_line,
      address: 'surabata' ?? npc?.anggota[1].alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
      ],
    },
  ];

  //Senior
  const dataTeamMember = [
    {
      title: 'Ketua Tim',
      name: 'Tsani' ?? npc?.anggota[1].nama,
      email: 'tsani@mail.com' ?? npc?.anggota[1].email,
      nisn: '3213131' ?? npc?.anggota[1].nisn,
      phone: '089123123' ?? npc?.anggota[1].nomor_telepon,
      line: 'tsani' ?? npc?.anggota[1].id_line,
      address: 'surabata' ?? npc?.anggota[1].alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
      ],
    },
    {
      title: 'Anggota 1',
      name: 'Budi' ?? npc?.anggota[0].nama,
      email: 'budi@mail.com' ?? npc?.anggota[0].email,
      nisn: '123213' ?? npc?.anggota[0].nisn,
      phone: '081231312' ?? npc?.anggota[0].nomor_telepon,
      line: 'budiss' ?? npc?.anggota[0].id_line,
      address: 'bekasi' ?? npc?.anggota[0].alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
      ],
    },
    {
      title: 'Anggota 2',
      name: 'Budi' ?? npc?.anggota[0].nama,
      email: 'budi@mail.com' ?? npc?.anggota[0].email,
      nisn: '123213' ?? npc?.anggota[0].nisn,
      phone: '081231312' ?? npc?.anggota[0].nomor_telepon,
      line: 'budiss' ?? npc?.anggota[0].id_line,
      address: 'bekasi' ?? npc?.anggota[0].alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
      ],
    },
  ];

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='bg-white shadow'></div>
        <main className='w-full h-full px-4 pt-10 pb-16 mx-auto mt-0.5 bg-white'>
          {npc ? (
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Schematics</span>{' '}
                <span className='block text-npc xl:inline'>NPC</span>
              </h1>
              <p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                Schematics NPC merupakan sebuah kompetisi pemrograman tingkat
                nasional yang menguji kemampuan algoritma dan pemrograman dalam
                memecahkan masalah yang diberikan
              </p>
              <div className='max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                <div className='rounded-md shadow'>
                  <button
                    onClick={() => setOpen(true)}
                    className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 md:py-4 md:text-lg md:px-10'
                  >
                    Buat Tim
                  </button>
                  <Modal open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <>
                <section className='max-w-4xl px-4 mx-auto space-y-10 sm:px-6 md:px-0'>
                  <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Timeline</span>{' '}
                    <span className='block text-npc xl:inline'>
                      Schematics NPC
                    </span>
                  </h2>
                  <div className=''>
                    <HorizontalTimeline data={dataTimeline} />
                  </div>
                </section>
                <section className='max-w-4xl px-4 mx-auto mt-10 space-y-10 sm:px-6 md:px-0'>
                  <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Detail</span>{' '}
                    <span className='block text-npc xl:inline'>Tim</span>
                  </h2>
                  <div className='py-4 overflow-hidden bg-white sm:border sm:shadow sm:py-8 sm:px-6 lg:px-8 sm:rounded-lg'>
                    <TeamDetail data={dataTeam} />
                    <CenteredAccordion
                      dataAccordion={dataTeamMember}
                      component={TeamMemberDetail}
                    />
                    {npc?.status_pembayaran ?? (
                      <div className='mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                        <div className='rounded-md shadow'>
                          <Link
                            to='/my/sch-npc/payment'
                            className='flex items-center justify-center px-4 py-2 font-medium text-white border border-transparent rounded-md shadow-sm bg-npc hover:bg-npc-400'
                          >
                            Lakukan Pembayaran
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            </>
          )}
        </main>
      </main>
    </DashboardShell>
  );
}

const dataTimeline = [
  {
    id: 1,
    target: 'Pendaftaran',
    date: '03 Jul - 25 Sep',
    datetime: '2021-09-25',
    icon: HiClipboardCheck,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 2,
    target: 'Warm Up',
    date: '02 Okt - 03 Okt',
    datetime: '2021-10-03',
    icon: HiFire,
    iconBackground: 'bg-npc',
  },
  {
    id: 3,
    target: 'Penyisihan',
    date: '09 Okt',
    datetime: '2021-10-09',
    icon: HiUserGroup,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 4,
    target: 'Perdelapan  - Perempat Final',
    date: '16 Okt',
    datetime: '2021-10-16',
    icon: HiUsers,
    iconBackground: 'bg-npc',
  },
  {
    id: 5,
    target: 'Semi Final - Final - Awarding Night',
    date: '17 Okt',
    datetime: '2021-10-17',
    icon: HiUser,
    iconBackground: 'bg-gray-900',
  },
];
