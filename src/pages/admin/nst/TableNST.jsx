import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TablePembayaran from '@/components/Admin/TablePembayaran';

export default function TableNLCTeam() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const url = `/admin_get_list_pembayaran_nst?page=${page}&per_page=${per_page}`;
  const { data: listPayment, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  console.log(listPayment?.data);
  const COLUMNS = [
    {
      Header: 'Nama Pemesan',
      accessor: 'nama_pemesan',
    },
    {
      Header: 'Nama Bank',
      accessor: 'nama_bank',
    },
    {
      Header: 'Jumlah Tiket',
      accessor: 'jumlah_ticket',
    },
    {
      Header: 'Status Pembayaran',
      accessor: 'status_pembayaran',
    },
  ];

  if (!listPayment) {
    return <Loading />;
  }

  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <h1>Daftar Verifikasi Data Schematics NST</h1>
          <div className='flex flex-col md:flex-row md:items-center py-2 justify-between px-4 mt-4 mb-2 react-table-top '>
            <div className='relative flex items-center mt-3 md:mt-0 table-top-search'>
              <input
                className='text-xs py-2 h-10 px-4 pl-6 w-52 md:w-auto focus:outline-none leading-9 tracking-wide 
			    text-gray-700 border border-gray-300 bg-gray-100 rounded-lg'
                type='text'
                name='search'
                placeholder='SEARCH'
              />
            </div>
          </div>
          {/* Table */}
          <TablePembayaran
            dataItems={listPayment?.data?.data_per_page}
            col={COLUMNS}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
