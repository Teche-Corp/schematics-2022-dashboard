import { HiInformationCircle } from 'react-icons/hi';

import { classNames } from '@/lib/helper';
import UnstyledLink from '@/components/UnstyledLink';

const paymentStatuses = {
  not_paid: {
    text: 'Belum Melakukan Pembayaran',
    color: 'text-red-600',
  },
  waiting: {
    text: 'Sedang Diverifikasi',
    color: 'text-yellow-600',
  },
  paid: {
    text: 'Lunas',
    color: 'text-green-600',
  },
};

export default function TeamDetail({ data = {}, event = '', npc = '' }) {
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
              {data.name ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Asal Sekolah
              </dt>
              {data.school ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.school}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Kota</dt>
              {data.city ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.city}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Provinsi</dt>
              {data.province ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.province}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Region</dt>
              {data.region ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.region}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Password Tim
              </dt>
              {data.password ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.password}</dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                Status Pembayaran
              </dt>
              {data.payment ? (
                <dd
                  className={classNames(
                    'mt-1 text-sm font-bold',
                    paymentStatuses[data.payment].color,
                  )}
                >
                  {paymentStatuses[data.payment].text}
                </dd>
              ) : (
                <TextSkeleton />
              )}
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Tahap</dt>
              {data.phase ? (
                <dd className='mt-1 text-sm text-gray-900'>{data.phase}</dd>
              ) : (
                <TextSkeleton />
              )}
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
        {event === 'npc' && data.payment === 'paid' ? (
          <div className='p-4 mt-2 rounded-md bg-green-50'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <HiInformationCircle
                  className='w-5 h-5 text-green-400'
                  aria-hidden='true'
                />
              </div>
              <div className='ml-2 space-y-2'>
                <p className='text-sm text-green-700'>
                  Anda dapat bergabung ke server Discord Schematics NPC 2021
                  melalui{' '}
                  <UnstyledLink
                    href='https://discord.gg/Cf3frP8tWy'
                    className='font-bold underline'
                  >
                    link berikut
                  </UnstyledLink>
                </p>
                <p className='text-sm text-green-700'>
                  Akses portal Schematics NPC melalui{' '}
                  <UnstyledLink
                    href={
                      npc === 'npc_junior'
                        ? 'https://schematics.its.ac.id/sch-npc/portal/junior/'
                        : 'https://schematics.its.ac.id/sch-npc/portal/senior/'
                    }
                    className='font-bold underline'
                  >
                    link berikut
                  </UnstyledLink>
                </p>
              </div>
            </div>
          </div>
        ) : event === 'nlc' && data.payment === 'paid' ? (
          <>
            <div className='p-4 mt-2 rounded-md bg-green-50'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <HiInformationCircle
                    className='w-5 h-5 text-green-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-2 space-y-2'>
                  <p className='text-sm text-green-700'>
                    Anda dapat bergabung ke Grup Telegram Schematics NLC 2021
                    melalui{' '}
                    <UnstyledLink
                      href={'https://t.me/joinchat/JVbP1qq884A5MzE1'}
                      className='font-bold underline'
                    >
                      link berikut
                    </UnstyledLink>
                  </p>
                  <p className='text-sm text-green-700'>
                    Anda dapat bergabung ke Forum Diskusi Schematics NLC 2021
                    melalui{' '}
                    <UnstyledLink
                      href={'https://t.me/joinchat/9-5quHMQgSFjNTll'}
                      className='font-bold underline'
                    >
                      link berikut
                    </UnstyledLink>
                  </p>
                </div>
              </div>
            </div>
            <div className='p-4 mt-2 rounded-md bg-green-50'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <HiInformationCircle
                    className='w-5 h-5 text-green-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-2 space-y-2'>
                  <p className='text-sm text-green-700'>
                    Akses portal Schematics NLC melalui{' '}
                    <UnstyledLink
                      href={'https://schematics.its.ac.id/sch-nlc/portal'}
                      className='font-bold underline'
                    >
                      link berikut
                    </UnstyledLink>
                  </p>
                  {/* Kalau tahapan tidak null, tampilkan username dan password moodle */}
                  {data.phase !== '-' && (
                    <>
                      <p className='text-sm text-green-700'>
                        Username: {data?.phase?.username}
                      </p>
                      <p className='text-sm text-green-700'>
                        Password: {data?.phase?.password}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function TextSkeleton() {
  return <div className='w-48 h-5 mt-1 bg-gray-400 rounded animate-pulse' />;
}
