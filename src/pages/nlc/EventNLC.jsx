import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import CenteredAccordion from '@/components/CenteredAccordion';
import HorizontalTimeline from '@/components/HorizontalTimeline';
import TeamDetail from '@/components/TeamDetail';
import TeamMemberDetail from '@/components/TeamMemberDetail';
import {
  HiCheckCircle,
  HiOfficeBuilding,
  HiClipboardCheck,
  HiFire,
  HiUserGroup,
  HiUsers,
  HiUser,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const dataTimeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Pendaftaran',
    href: '#',
    date: 'Jun 26 - Sep 25',
    datetime: '2021-09-21',
    icon: HiClipboardCheck,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Warm Up',
    href: '#',
    date: 'Okt 02 - Okt 03',
    datetime: '2021-10-03',
    icon: HiFire,
    iconBackground: 'bg-nlc',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Penyisihan',
    href: '#',
    date: 'Okt 09',
    datetime: '2021-10-09',
    icon: HiUserGroup,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Perdelapan  - Perempat Final',
    href: '#',
    date: 'Okt 16',
    datetime: '2021-10-16',
    icon: HiUsers,
    iconBackground: 'bg-nlc',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Semi Final - Final - Awarding night',
    href: '#',
    date: 'Okt 17',
    datetime: '2021-10-17',
    icon: HiUser,
    iconBackground: 'bg-gray-900',
  },
];

export default function EventNLC() {
  const { user } = useAuthState();

  const dataTeam = {
    name: 'Belajar Logika',
    school: 'SMA Taruna Nusantara',
    region: 'Surabaya',
    city: 'Surabaya',
    province: 'Jawa Timur',
    payment: 'Lunas',
    phase: 'Final',
  };

  const dataTeamMember = [
    {
      title: 'Ketua Tim',
      name: 'Margot Foster',
      email: user.email,
      nisn: '05123940000123',
      phone: '08512345678',
      line: 'someone',
      address: 'Street',
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
        {
          name: 'Surat Perizinan',
          link: '#',
        },
      ],
    },
    {
      title: 'Anggota 1',
      name: 'Margot Faster',
      email: user.email,
      nisn: '05123940000123',
      phone: '08512345678',
      line: 'someone',
      address: 'Street',
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
        {
          name: 'Surat Perizinan',
          link: '#',
        },
      ],
    },
    {
      title: 'Anggota 2',
      name: 'Margot Fuster',
      email: user.email,
      nisn: '05123940000123',
      phone: '08512345678',
      line: 'someone',
      address: 'Street',
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: '#',
        },
        {
          name: 'Surat Perizinan',
          link: '#',
        },
      ],
    },
  ];

  return (
    <DashboardShell>
      <main className='h-5/6'>
        <div className='w-full px-4 py-20 mx-auto mt-1 bg-white'>
          <div className='min-h-full px-4 sm:px-6 lg:max-w-4xl lg:mx-auto lg:px-8'>
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Schematics</span>{' '}
                <span className='block text-nlc xl:inline'>NLC</span>
              </h1>
              <p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                Schematics NLC merupakan kompetisi logika terbesar di Indonesia,
                dengan jumlah peserta yang kerap meningkat tiap tahunnya
              </p>
              <div className='max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                <div className='rounded-md shadow'>
                  <Link
                    to='/my/sch-nlc/team/create'
                    className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-nlc hover:bg-nlc-400 md:py-4 md:text-lg md:px-10'
                  >
                    Buat Tim
                  </Link>
                </div>
              </div>
            </div>
            <section className='px-4 py-12 mx-auto mt-12 align-items-center'>
              <div className='text-center'>
                <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>
                  <span className='block xl:inline'>Timeline</span>{' '}
                  <span className='block text-nlc xl:inline'>NLC</span>
                </h2>
              </div>
              <div className='my-8'>
                <HorizontalTimeline data={dataTimeline} />
              </div>
            </section>
            <section>
              <div className='text-center'>
                <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>
                  <span className='block xl:inline'>Detail</span>{' '}
                  <span className='block text-nlc xl:inline'>Tim</span>
                </h2>
              </div>
              <TeamDetail data={dataTeam} />
              <CenteredAccordion
                dataAccordion={dataTeamMember}
                component={TeamMemberDetail}
              ></CenteredAccordion>
            </section>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
