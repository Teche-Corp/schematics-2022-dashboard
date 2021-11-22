import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { IoMdRefresh } from 'react-icons/io';
import { ImSpinner } from 'react-icons/im';
import {
  HiOutlineCloud,
  HiOutlineDocumentReport,
  HiUserGroup,
} from 'react-icons/hi';

import { getWithToken } from '@/lib/swr';
import { classNames } from '@/lib/helper';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import UnstyledLink from '@/components/UnstyledLink';
import AdminTable from '@/components/AdminTable';
import ExportButton from '@/components/Button/ExportButton';

export default function AdminNpcJunior() {
  const [page, setPage] = useState(1);

  const {
    data: dataSWR,
    isValidating,
    revalidate,
  } = useSWR(`/admin/list/tim/npcj?page=${page}`, getWithToken);

  const revalidateTable = isValidating ? null : () => revalidate();
  const data = dataSWR?.data?.teams ?? [];
  const pages = dataSWR?.data?.total_page ?? undefined;

  const cards = [
    {
      id: 1,
      name: 'Total Pendaftaran',
      href: '#',
      icon: HiUserGroup,
      amount: data?.length || 'Menunggu data..',
    },
    {
      id: 2,
      name: 'Score Team',
      href: '#',
      icon: HiOutlineDocumentReport,
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
        Header: 'Nama Tim',
        accessor: 'team_name',
      },
      {
        Header: 'Detail',
        accessor: (d) => {
          return (
            <Link
              className='font-bold text-npc'
              id={d?.team_id}
              to={{
                pathname: `/admin/sch-npc/junior/user/${Number(
                  d?.team_id,
                )}/edit`,
                search: `?page=${page}`,
              }}
            >
              Lihat Detail
            </Link>
          );
        },
      },
      {
        Header: 'Verified',
        accessor: (d) => {
          return d.bukti_pembayaran?.is_verified ? (
            <span className='text-green-500'>Ya</span>
          ) : (
            <span className='text-red-500'>Tidak</span>
          );
        },
      },
      {
        Header: 'Status Bayar',
        accessor: (d) => {
          return d?.bukti_pembayaran ? (
            <span className='text-green-500'>Sudah</span>
          ) : (
            <span className='text-red-500'>Belum</span>
          );
        },
      },
      {
        Header: 'Region',
        accessor: 'kota.region_name',
      },
      {
        Header: 'Provinsi',
        accessor: 'kota.province_name',
      },
      {
        Header: 'Kota',
        accessor: 'kota.regency_name',
      },
      {
        Header: 'Ketua',
        accessor: (d) => (
          <>
            {d?.user_ketua?.name} - {d?.user_ketua?.email} -{' '}
            {d?.anggota_ketua?.anggota_id_line || 'Data line tidak dimasukan'} -{' '}
            <UnstyledLink
              className='text-blue-400 underline'
              href={`https://wa.me/${d?.user_ketua?.phone}`}
            >
              ({d?.user_ketua?.phone})
            </UnstyledLink>{' '}
            -{' '}
            {d?.anggota_ketua?.anggota_id_facebook ||
              'Data discord tidak dimasukan'}
          </>
        ),
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
                <span className='block text-npc xl:inline'>
                  Schematics NPC Junior
                </span>
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
                  <ImSpinner className='mx-auto mb-3 w-7 h-7 animate-spin text-npc' />
                  <p>Sedang menunggu data...</p>
                </div>
              </div>
            ) : (
              <AdminTable
                columns={columns}
                data={data}
                header={
                  <ExportButton
                    name='NPC-Junior.xlsx'
                    url='/admin/export/npc/tim/junior'
                  />
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
