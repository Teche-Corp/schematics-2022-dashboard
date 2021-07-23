import DashboardAdminShell from '@/layout/DashboardAdminShell';
import VoucherTable from '@/components/VoucherTable';
import { Link } from 'react-router-dom';
import { HiCheckCircle, HiOfficeBuilding } from 'react-icons/hi';

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
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <div className='px-4 pb-16 sm:px-6 md:px-0'>
            <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6 lg:px-6'>
              <div className='flex flex-wrap content-start'>
                <h2 className='max-w-6xl pl-2 text-lg font-medium leading-6 text-gray-900 mt-7 '>
                  Daftar Voucher
                </h2>
                <div className='pt-5'>
                  <div className='flex justify-end'>
                    <Link
                      to='/admin/voucher/add'
                      className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-700 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                    >
                      Tambah Voucher
                    </Link>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 mx-2 sm:mr-8 lg:mx-0 mt-6 gap-y-1'>
                <VoucherTable />
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
