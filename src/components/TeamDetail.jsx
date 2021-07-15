import { HiInformationCircle } from 'react-icons/hi';

export default function TeamDetail({ data = {} }) {
  return (
    <div>
      <div className='overflow-hidden sm:rounded-lg'>
        <div>
          <h3 className='text-lg font-bold leading-6 text-gray-900'>
            Informasi Tim
          </h3>
        </div>
        <div className='px-4 py-4 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Nama Tim</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Asal Sekolah
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.school}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Kota</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.city}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Provinsi</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.province}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Region</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.region}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Password Tim
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.password}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Status Pembayaran
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.payment}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Tahap</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.phase}</dd>
            </div>
          </dl>
        </div>
        <div className='p-4 rounded-md bg-blue-50'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <HiInformationCircle
                className='w-5 h-5 text-blue-400'
                aria-hidden='true'
              />
            </div>
            <div className='ml-2'>
              <p className='text-sm text-blue-700'>
                Anggota dapat melakukan login menggunakan email masing-masing
                yang telah didaftarkan dan{' '}
                <span className='font-bold'>Password Tim</span> yang tertera
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
