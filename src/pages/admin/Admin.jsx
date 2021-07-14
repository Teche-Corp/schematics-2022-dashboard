import DashboardAdminShell from '@/layout/DashboardAdminShell';
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

const cards = [
  {
    name: 'Total Pendaftaran',
    href: '#',
    icon: HiUserGroup,
    amount: '2',
  },
  {
    name: 'Total Pendapatan',
    href: '#',
    icon: FaMoneyCheck,
    amount: 'Rp.10.000',
  },
  {
    name: 'Schematics NPC',
    href: '#',
    icon: HiDesktopComputer,
    amount: '1',
    date: 'Juni 2021',
  },
  {
    name: 'Shematics NLC',
    href: '#',
    icon: BiBrain,
    amount: '1',
    date: 'Juli 2021',
  },
  {
    name: 'Schematics NST',
    href: '#',
    icon: HiSpeakerphone,
    amount: '0',
    date: 'Oktober 2021',
  },
  {
    name: 'Schematics Reeva',
    href: '#',
    icon: HiOutlineSpeakerphone,
    amount: '0',
    date: 'Juni 2021',
  },
];

export default function Admin() {
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
                          <dt className='text-sm font-medium text-gray-500 truncate'>
                            {card.name}
                          </dt>
                          <dd>
                            <div className='text-lg font-medium text-gray-900'>
                              {card.amount}
                            </div>
                          </dd>
                          <p className='text-xs text-gray-900'>
                            {card.date ?? undefined}
                          </p>
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
