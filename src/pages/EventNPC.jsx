import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import { HiCheckCircle, HiOfficeBuilding } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function EventNPC() {
  const { user } = useAuthState();

  return (
    <DashboardShell>
      <main className='h-5/6'>
        <div className='bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                {/* Profile */}
                <div className='flex items-center'>
                  {/* <img
              className='hidden w-16 h-16 rounded-full sm:block'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80'
              alt=''
            /> */}
                  <div>
                    <div className='flex items-center'>
                      {/* <img
                  className='w-16 h-16 rounded-full sm:hidden'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80'
                  alt=''
                /> */}
                      <h1 className='text-2xl font-bold leading-7 text-gray-900 md:ml-3 sm:leading-9 sm:truncate'>
                        Hello, {user?.name}
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
                        Verified account
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className='flex mt-6 space-x-3 md:mt-0 md:ml-4'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Join Team
                </button>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
        <main className='w-full h-full px-4 py-20 mx-auto mt-1 bg-white '>
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
                <Link
                  to='/sch-npc/create-team/junior'
                  className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 md:py-4 md:text-lg md:px-10'
                >
                  Junior NPC
                </Link>
              </div>
              <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                <Link
                  to='/sch-npc/create-team/senior'
                  className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-red-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
                >
                  Senior NPC
                </Link>
              </div>
            </div>
          </div>
        </main>
      </main>
    </DashboardShell>
  );
}
