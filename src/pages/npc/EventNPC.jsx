import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  HiClipboardCheck,
  HiFire,
  HiUser,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';

import { useTeamDispatch, useTeamState } from '@/contexts/TeamContext';

import DashboardShell from '@/layout/DashboardShell';
import CenteredAccordion from '@/components/CenteredAccordion';
import HorizontalTimeline from '@/components/HorizontalTimeline';
import Modal from '@/components/Modal';
import TeamDetail from '@/components/TeamDetail';
import TeamMemberDetail from '@/components/TeamMemberDetail';

import { bearerToken } from '@/lib/helper';
import useTeamId from '@/hooks/useTeamId';

export default function EventNPC() {
  const [open, setOpen] = useState(false);

  const { npc } = useTeamState();
  const dispatch = useTeamDispatch();

  const teamId = useTeamId('npc');

  const ketua = npc?.anggota.find((anggotaEl) => anggotaEl.role === 'ketua');
  const anggota = npc?.anggota.filter(
    (anggotaEl) => anggotaEl.role === 'anggota',
  );

  const teamLoaded = Boolean(npc);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await axios.post(
          '/npc/team/find',
          { team_id: teamId },
          {
            headers: { ...bearerToken() },
          },
        );

        dispatch('STORE_NPC', res.data.data);
      } catch (err) {
        toast.error('Gagal mengambil data tim!');
      }
    };

    if (teamId) {
      loadTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTeam = {
    name: npc?.nama_tim,
    school: npc?.asal_sekolah,
    region: npc?.region,
    city: npc?.kota,
    province: npc?.provinsi,
    // TODO hilangkan password di junior
    password: `schnpc${ketua?.nama}`,
    payment:
      npc?.status_pembayaran === null
        ? 'not_paid'
        : npc?.status_pembayaran === false
        ? 'waiting'
        : 'paid',
    phase: npc?.tahapan ?? '-',
  };

  const dataTeamMemberJunior = [
    {
      title: 'Data Pribadi',
      name: ketua?.nama,
      email: ketua?.email,
      nisn: ketua?.nisn,
      phone: ketua?.nomor_telepon,
      line: ketua?.id_line,
      address: ketua?.alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: ketua?.link_bukti_sah,
        },
      ],
    },
  ];

  //Senior
  const dataTeamMemberSenior = [
    {
      title: 'Ketua Tim',
      name: ketua?.nama,
      email: ketua?.email,
      nisn: ketua?.nisn,
      phone: ketua?.nomor_telepon,
      line: ketua?.id_line,
      address: ketua?.alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: ketua?.link_bukti_sah,
        },
      ],
    },
    // conditionally add object
    ...(anggota?.[0]
      ? [
          {
            title: 'Anggota 1',
            name: anggota?.[0]?.nama,
            email: anggota?.[0]?.email,
            nisn: anggota?.[0]?.nisn,
            phone: anggota?.[0]?.nomor_telepon,
            line: anggota?.[0]?.id_line,
            address: anggota?.[0]?.alamat,
            attachment: [
              {
                name: 'Surat Keterangan Aktif',
                link: anggota?.[0]?.link_bukti_sah,
              },
            ],
          },
        ]
      : []),
    // conditionally add object
    ...(anggota?.[1]
      ? [
          {
            title: 'Anggota 2',
            name: anggota?.[1]?.nama,
            email: anggota?.[1]?.email,
            nisn: anggota?.[1]?.nisn,
            phone: anggota?.[1]?.nomor_telepon,
            line: anggota?.[1]?.id_line,
            address: anggota?.[1]?.alamat,
            attachment: [
              {
                name: 'Surat Keterangan Aktif',
                link: anggota?.[1]?.link_bukti_sah,
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='bg-white shadow'></div>
        <main className='w-full h-full px-4 pt-10 pb-16 mx-auto mt-0.5 bg-white'>
          {/* If in AuthContext has teamId, then show the team detail page, and show skeleton */}
          {!teamId ? (
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Schematics</span>{' '}
                <span className='block text-npc-400 xl:inline'>NPC</span>
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
                    className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-npc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-400 hover:bg-npc-700 md:py-4 md:text-lg md:px-10'
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
                    <span className='block text-npc-400 xl:inline'>
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
                    <span className='block text-npc-400 xl:inline'>Tim</span>
                  </h2>
                  <div className='py-4 overflow-hidden bg-white sm:border sm:shadow sm:py-8 sm:px-6 lg:px-8 sm:rounded-lg'>
                    {/* if not loaded yet, then pass undefined */}
                    <TeamDetail
                      data={teamLoaded ? dataTeam : undefined}
                      event='npc'
                    />
                    <CenteredAccordion
                      loading={!teamLoaded}
                      dataAccordion={
                        npc?.event === 'npc_junior'
                          ? dataTeamMemberJunior
                          : dataTeamMemberSenior
                      }
                      component={TeamMemberDetail}
                    />
                    {npc?.status_pembayaran ?? (
                      <div className='mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                        <div className='rounded-md shadow'>
                          {/* passing undefined so link won't be clickable */}
                          <Link
                            to={teamLoaded ? '/my/sch-npc/payment' : undefined}
                            className='flex items-center justify-center px-4 py-2 font-medium text-white border border-transparent rounded-md shadow-sm bg-npc-400 hover:bg-npc-700'
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
    date: '18 Jul - 11 Sep',
    datetime: '2021-09-11',
    icon: HiClipboardCheck,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 2,
    target: 'Warm Up',
    date: '24 Sep',
    datetime: '2021-09-24',
    icon: HiFire,
    iconBackground: 'bg-npc-400',
  },
  {
    id: 3,
    target: 'Penyisihan Online',
    date: '25 Sep',
    datetime: '2021-09-25',
    icon: HiUserGroup,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 4,
    target: 'Pengumuman Finalis',
    date: '02 Okt',
    datetime: '2021-10-02',
    icon: HiUsers,
    iconBackground: 'bg-npc-400',
  },
  {
    id: 5,
    target: 'Final - Awarding Night',
    date: '17 Okt',
    datetime: '2021-10-17',
    icon: HiUser,
    iconBackground: 'bg-gray-900',
  },
];
