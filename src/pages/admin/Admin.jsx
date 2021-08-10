import useSWR from 'swr';
import toast from 'react-hot-toast';

import {
  HiCheckCircle,
  HiDesktopComputer,
  HiOfficeBuilding,
  HiOutlineSpeakerphone,
  HiSpeakerphone,
  HiUserGroup,
} from 'react-icons/hi';
import { BiBrain } from 'react-icons/bi';
import { FaMoneyCheck } from 'react-icons/fa';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import UnstyledLink from '@/components/UnstyledLink';

import { numberToRupiah } from '@/lib/helper';
import { getWithToken } from '@/lib/swr';
import useSWRLoadingToast from '@/hooks/useSWRLoadingToast';

export default function Admin() {
  const { data, error: errorStatistics } = useSWR(
    '/statistics?total_daftar=1&total_pendapatan=1&nlc_sudah_bayar=1&npcj_sudah_bayar=1&npcs_sudah_bayar=1&total_tim_nlc=1&total_tim_npcj=1&total_tim_npcs=1&total_tiket_nst_sudah_bayar=1&total_tiket_nst=1&total_tiket_reeva_sudah_bayar=1&total_tiket_reeva=1',
    getWithToken,
  );
  useSWRLoadingToast(data, errorStatistics, {
    loading: 'Mengambil data statistik',
    success: 'Data statistik berhasil diambil',
  });

  const cards = [
    {
      name: 'Total Pendaftaran',
      href: '#',
      icon: HiUserGroup,
      amount: data?.data?.total_pendaftaran,
    },
    {
      name: 'Total Pendapatan',
      href: '/admin/earning',
      icon: FaMoneyCheck,
      amount: numberToRupiah(data?.data?.total_pendapatan),
    },
    {
      name: 'Schematics NPC Junior',
      href: '/admin/sch-npc/junior/user',
      icon: HiDesktopComputer,
      amount: data?.data?.total_tim_npc_junior,
      paid: data?.data?.total_tim_npc_junior_sudah_bayar,
    },
    {
      name: 'Schematics NPC Senior',
      href: '/admin/sch-npc/senior/user',
      icon: HiDesktopComputer,
      amount: data?.data?.total_tim_npc_senior,
      paid: data?.data?.total_tim_npc_senior_sudah_bayar,
    },
    {
      name: 'Shematics NLC',
      href: '/admin/sch-nlc/user',
      icon: BiBrain,
      amount: data?.data?.total_tim_nlc,
      paid: data?.data?.total_tim_nlc_sudah_bayar,
    },
    {
      name: 'Schematics NST',
      href: '/admin/sch-nst/user',
      icon: HiSpeakerphone,
      amount: data?.data?.total_tiket_nst,
      paid: data?.data?.total_tiket_nst_sudah_bayar,
    },
    {
      name: 'Schematics Reeva',
      href: '/admin/sch-reeva/user',
      icon: HiOutlineSpeakerphone,
      amount: data?.data?.total_tiket_reeva,
      paid: data?.data?.total_tiket_reeva_sudah_bayar,
    },
  ];

  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto'>
        {/* Page header */}
        <div className='bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center'>
                  <div>
                    <div className='flex items-center'>
                      <h1 className='text-2xl font-bold leading-7 text-gray-900 md:ml-3 sm:leading-9 sm:truncate'>
                        Hello, Admin Schematics 2021
                      </h1>
                    </div>
                    <dl className='flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                      <dt className='sr-only'>Company</dt>
                      <dd className='flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6'>
                        <HiOfficeBuilding
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        Institut Teknologi Sepuluh Nopember
                      </dd>
                      <dt className='sr-only'>Account status</dt>
                      <dd className='flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0'>
                        <HiCheckCircle
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-400'
                          aria-hidden='true'
                        />
                        Akun Admin
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              {/* <div className='flex mt-6 space-x-3 md:mt-0 md:ml-4'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Add money
                </button>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Send money
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className='mt-8 '>
          {/* children */}
          <div className='max-w-6xl px-4 mx-auto sm:px-6 lg:px-8'>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Statistik Pendaftaran
            </h2>
            <div className='grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className='overflow-hidden bg-white rounded-lg shadow'
                >
                  <div className='p-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <card.icon
                          className='w-6 h-6 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex-1 w-0 ml-5 '>
                        <dl>
                          <UnstyledLink
                            href={card.href}
                            className='text-sm font-medium text-gray-500 truncate'
                          >
                            {card.name}
                          </UnstyledLink>
                          {!errorStatistics && data ? (
                            <>
                              <dd>
                                <div className='text-lg font-medium text-gray-900'>
                                  {card.amount}
                                </div>
                              </dd>
                              <p className='text-xs text-gray-900'>
                                {card.paid !== undefined
                                  ? `${card.paid} sudah membayar`
                                  : ''}
                              </p>
                            </>
                          ) : (
                            <div className='w-48 h-4 mt-1 bg-gray-400 rounded animate-pulse' />
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
