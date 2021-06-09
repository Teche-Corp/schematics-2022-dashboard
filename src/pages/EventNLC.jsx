import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import { HiCheckCircle, HiOfficeBuilding } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function EventNLC() {
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
            </div>
          </div>
        </div>
        <main className='w-full h-full px-4 py-20 mx-auto mt-1 bg-white '>
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
                  to='/sch-nlc/create-team'
                  className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-nlc hover:bg-nlc-400 md:py-4 md:text-lg md:px-10'
                >
                  Buat Tim
                </Link>
              </div>
            </div>
          </div>
        </main>
      </main>
    </DashboardShell>
  );
}
