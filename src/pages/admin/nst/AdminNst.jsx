import useSWR from 'swr';
import { useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoMdRefresh } from 'react-icons/io';
import { ImSpinner } from 'react-icons/im';
import { HiOutlineCloud, HiUserGroup } from 'react-icons/hi';
import { format } from 'date-fns';
import localeID from 'date-fns/locale/id';

import DashboardAdminShell from '@/layout/DashboardAdminShell';

import { getWithToken } from '@/lib/swr';
import { classNames } from '@/lib/helper';

import UnstyledLink from '@/components/UnstyledLink';
import AdminTable from '@/components/AdminTable';
import ExportButton from '@/components/Button/ExportButton';

export default function AdminNst() {
  const [page, setPage] = useState(1);

  const {
    data: dataSWR,
    isValidating,
    revalidate,
  } = useSWR(`/admin/list/tim/nst?page=${page}`, getWithToken);
  const revalidateTable = isValidating ? null : () => revalidate();
  const data = dataSWR?.data?.teams ?? [];
  const pages = dataSWR?.data?.total_page ?? undefined;

  const cards = [
    {
      id: 1,
      name: 'Total Pendaftaran',
      href: '#',
      icon: HiUserGroup,
      amount: !dataSWR ? 'Menunggu data...' : data.length,
    },
    {
      id: 3,
      name: 'Upload Berkas',
      href: '#',
      icon: HiOutlineCloud,
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: (_row, i) => i + 1,
      },
      {
        Header: 'Nama',
        accessor: 'user.name',
      },
      {
        Header: 'Email',
        accessor: 'user.email',
      },
      {
        Header: 'Nomor Telepon',
        accessor: (d) => (
          <>
            <UnstyledLink
              className='text-blue-400 underline'
              href={`https://wa.me/${d?.user?.phone}`}
            >
              {d?.user?.phone}
            </UnstyledLink>
          </>
        ),
      },
      {
        Header: 'Tanggal Pembuatan',
        accessor: (d) => {
          let formattedTime = new Date(d?.created_at);

          return (
            <p>
              {format(formattedTime, 'dd MMMM yyyy HH:mm:ss', {
                locale: localeID,
              })}
            </p>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto border-t'>
        <div className='mt-8 '>
          {/* children */}
          <div className='max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 '>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Statistik Pendaftaran
            </h2>
            <div className='grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.id}
                  className='overflow-hidden bg-white rounded-lg shadow'
                >
                  <div className='p-5 '>
                    <div
                      className={`${
                        card.name !== 'Total Pendaftaran' ? 'lg:mt-3' : null
                      } flex items-center `}
                    >
                      <div className='flex-shrink-0'>
                        <card.icon
                          className='w-6 h-6 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex-1 w-0 ml-5'>
                        <dl>
                          <dt
                            className={`${
                              card.name !== 'Total Pendaftaran'
                                ? 'text-gray-900 text-base'
                                : 'text-gray-500'
                            } text-sm  truncate`}
                          >
                            {card.name}
                          </dt>
                          <dd>
                            <div className='text-lg font-medium text-gray-900'>
                              {card.amount ?? undefined}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6 lg:px-8'>
            <div className='flex items-center gap-2 mt-7'>
              <h1 className='text-2xl font-bold leading-6 text-gray-900'>
                Tabel Pendaftar{' '}
                <span className='block text-nst xl:inline'>Schematics NST</span>
              </h1>

              <button
                data-for='refresh'
                data-tip='Refresh data tabel'
                onClick={revalidateTable}
                className='p-1 text-lg font-bold rounded-full focus:outline-none focus:ring ring-black'
              >
                <IoMdRefresh
                  className={classNames(isValidating && 'animate-spin')}
                />
              </button>
              <ReactTooltip
                id='refresh'
                delayHide={100}
                place='right'
                type='dark'
                effect='solid'
              />
            </div>

            {!dataSWR ? (
              <div className='flex justify-center py-10 mt-4'>
                <div>
                  <ImSpinner className='mx-auto mb-3 w-7 h-7 animate-spin text-nst' />
                  <p>Sedang menunggu data...</p>
                </div>
              </div>
            ) : (
              <AdminTable
                columns={columns}
                data={data}
                header={
                  <ExportButton name='NST.xlsx' url='/admin/export/nst' />
                }
                page={page}
                pages={pages}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
