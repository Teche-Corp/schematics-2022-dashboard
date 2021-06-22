export default function TeamDetail({ data = {} }) {
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto overflow-hidden sm:rounded-lg'>
        <div className='py-5'>
          <h3 className='text-2xl font-bold leading-6 text-gray-900'>
            Informasi Tim
          </h3>
        </div>
        <div className='px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
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
            <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-gray-500'>Region</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.region}</dd>
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
      </div>
    </div>
  );
}