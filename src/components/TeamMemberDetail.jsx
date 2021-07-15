import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import { HiOutlinePaperClip } from 'react-icons/hi';

export default function TeamMemberDetail({ data = {} }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = data.attachment.map((attachmentEl) => attachmentEl.link);

  return (
    <>
      <div className='overflow-hidden bg-white sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Nama</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Alamat Email
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.email}</dd>
            </div>
            <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-gray-500'>NISN</dt>
              <dd className='mt-1 text-sm text-gray-900'>{data.nisn}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Nomor Telepon
              </dt>
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
                        <HiOutlinePaperClip
                          className='flex-shrink-0 w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='flex-1 w-0 ml-2 truncate'>
                          {item.name}
                        </span>
                      </div>
                      <div className='flex-shrink-0 ml-4'>
                        <button
                          onClick={() => setIsOpen(true)}
                          className='font-medium text-gray-500 focus:outline-none hover:text-gray-700'
                        >
                          Lihat
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length,
            )
          }
          onMoveNextRequest={() =>
            setIndex((prevIndex) => (index + 1) % images.length)
          }
        />
      )}
    </>
  );
}
