import { format } from 'date-fns';
import localeID from 'date-fns/locale/id';

import UnstyledLink from '@/components/UnstyledLink';

export default function TicketDetail({ data = {} }) {
  let formattedTime = new Date(data?.created_at);
  formattedTime.setHours(formattedTime.getHours() + 7);

  return (
    <div>
      <div className='overflow-hidden sm:rounded-lg'>
        <div>
          <h3 className='text-lg font-bold leading-6 text-gray-900'>
            Informasi Tiket
          </h3>
        </div>
        <div className='px-4 py-4 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Nama Peserta
              </dt>
              {data.name ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Nomor Telepon
              </dt>
              {data.phone ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.phone}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Email</dt>
              {data.email ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.email}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Tanggal Pemesanan
              </dt>
              {data.created_at ? (
                <dd className='mt-1 text-sm text-gray-900'>
                  {format(formattedTime, 'dd MMMM yyyy HH:mm:ss', {
                    locale: localeID,
                  })}
                </dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Link Zoom</dt>
              {data.name ? (
                <dd className='text-white bg-nst hover:bg-nst-700 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium mt-1'>
                  <UnstyledLink href='https://us02web.zoom.us/j/81798460344?pwd=R1NaQUZaWkNNQU1PMDdaT0EyZWRXZz09'>
                    Click here to join
                  </UnstyledLink>
                </dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Link Stream Youtube
              </dt>
              {data.name ? (
                <dd className='text-white bg-nst hover:bg-nst-700 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium mt-1'>
                  <UnstyledLink href='https://youtu.be/MQKC0ze77Pw'>
                    Click here to watch
                  </UnstyledLink>
                </dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function TextSkeleton() {
  return <div className='w-48 h-5 mt-1 bg-gray-400 rounded animate-pulse' />;
}
