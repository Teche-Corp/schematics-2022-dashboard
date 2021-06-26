import { PaperClipIcon } from '@heroicons/react/solid';

export default function TeamMemberDetail({ data = {} }) {
  return (
    <div className='overflow-hidden bg-white sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Nama</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Alamat Email</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.email}</dd>
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>NISN</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.nisn}</dd>
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Nomor Telepon</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.phone}</dd>
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>ID Line</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.line}</dd>
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>Alamat</dt>
            <dd className='mt-1 text-sm text-gray-900'>{data.address}</dd>
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>Berkas</dt>
            <dd className='mt-1 text-sm text-gray-900'>
              <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
                {data.attachment.map((item) => (
                  <li
                    className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
                    key={item.name}
                  >
                    <div className='flex items-center flex-1 w-0'>
                      <PaperClipIcon
                        className='flex-shrink-0 w-5 h-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='flex-1 w-0 ml-2 truncate'>
                        {item.name}
                      </span>
                    </div>
                    <div className='flex-shrink-0 ml-4'>
                      <a
                        href={item.link}
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Unduh
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
