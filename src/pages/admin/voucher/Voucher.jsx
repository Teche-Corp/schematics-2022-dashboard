import useSWR from 'swr';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { IoMdRefresh } from 'react-icons/io';
import { ImSpinner } from 'react-icons/im';

import { emptyPostWithToken } from '@/lib/swr';
import { classNames } from '@/lib/helper';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import VoucherTable from '@/components/VoucherTable';

export default function Admin() {
  const { data: dataSWR, isValidating, revalidate } = useSWR(
    '/voucher/list',
    emptyPostWithToken,
  );
  const revalidateTable = isValidating ? null : () => revalidate();
  const data = dataSWR?.data ?? [];

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        Cell: (d) => {
          return d.row.index + 1;
        },
      },
      {
        Header: 'Kode',
        accessor: 'kode_voucher',
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
      },
      {
        Header: 'Potongan',
        accessor: 'potongan_persen',
      },
      {
        Header: 'Limit',
        accessor: 'limit_jumlah',
      },
      {
        Header: 'Tanggal Mulai',
        accessor: 'tanggal_mulai',
      },
      {
        Header: 'Tanggal Berakhir',
        accessor: 'tanggal_berakhir',
      },
      {
        Header: 'Status',
        accessor: (d) => {
          return d.is_active ? (
            <span className='text-green-500'>Aktif</span>
          ) : (
            <span className='text-red-500'>Tidak</span>
          );
        },
      },
      {
        Header: 'Edit',
        accessor: (d) => {
          return (
            <Link
              className='font-bold text-nlc'
              to={{
                pathname: `/admin/sch-nlc/user/${d?.kode_voucher}/edit`,
              }}
            >
              Edit
            </Link>
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
          <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6'>
            <div className='flex items-center justify-between'>
              <div className='flex space-x-2'>
                <h2 className='max-w-6xl text-lg font-medium leading-6 text-gray-900'>
                  Daftar Voucher
                </h2>
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
              <div className=''>
                <Link
                  to='/admin/voucher/add'
                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-700 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                >
                  Tambah Voucher
                </Link>
              </div>
            </div>

            {!dataSWR ? (
              <div className='flex justify-center py-10 mt-4'>
                <div>
                  <ImSpinner className='mx-auto mb-3 text-gray-700 w-7 h-7 animate-spin' />
                  <p>Sedang menunggu data...</p>
                </div>
              </div>
            ) : (
              <VoucherTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
