import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import MainCard from '@/components/MainCard';

// const cards = [
//   {
//     name: 'Team',
//     href: '#',
//     icon: HiUserGroup,
//     amount: 'Doa-Ibu',
//   },
//   {
//     name: 'Payment Status',
//     href: '#',
//     icon: HiCreditCard,
//     amount: 'Success',
//   },
//   {
//     name: 'Events Verified',
//     href: '#',
//     icon: HiClipboardList,
//     amount: '0',
//   },
// ];

export default function Dashboard() {
  const { user } = useAuthState();

  return (
    <DashboardShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto'>
        {/* Page header */}
        <div className='bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                {/* Profile */}
                <div className='flex items-center'>
                  <div>
                    <div className='flex items-center'>
                      <h1 className='text-2xl font-bold leading-7 text-gray-900 md:ml-3 sm:leading-9 sm:truncate'>
                        Hello, {user?.email}
                      </h1>
                    </div>
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
          {/* <div className='max-w-6xl px-4 mx-auto sm:px-6 lg:px-8'>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Overview
            </h2>
            <div className='grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3'> */}
          {/* Card */}
          {/* {cards.map((card) => (
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
                      <div className='flex-1 w-0 ml-5'>
                        <dl>
                          <dt className='text-sm font-medium text-gray-500 truncate'>
                            {card.name}
                          </dt>
                          <dd>
                            <div className='text-lg font-medium text-gray-900'>
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className='px-5 py-3 bg-gray-50'>
                    <div className='text-sm'>
                      <a
                        href={card.href}
                        className='font-medium text-gray-700 hover:text-gray-900'
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6 lg:px-8'>
            <h2 className='max-w-6xl mx-auto text-lg font-medium leading-6 text-gray-900 mt-7 '>
              Schematics Events
            </h2>
            <MainCard />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
