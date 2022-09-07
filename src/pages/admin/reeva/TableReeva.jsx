import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdminPembayaran from '@/components/Admin/TablePembayaran';

export default function TableReeva() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const url = `/admin_get_list_pembayaran_reeva?page=${page}&per_page=${per_page}`;
  const { data: listPayment, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  // console.log(listPayment.data.data_per_page);

  if (!listPayment) {
    return <Loading />;
  }
  const COLUMNS = [
    {
      Headers: 'No',
      accessor: 'id',
      Cell: ({ row, flatRows }) => {
        return flatRows.indexOf(row) + 1;
      },
    },
    {
      Headers: 'Nama Pemesan',
      accessor: 'nama_pemesan',
    },
    {
      Headers: 'Nama Bank',
      accessor: 'nama_bank',
    },
    {
      Headers: 'Jumlah Tiket',
      accessor: 'jumlah_ticket',
    },
    {
      Headers: 'Status Pembayaran',
      accessor: 'status_pembayaran',
    },
  ];
  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <div className='bg-white p-4 mx-auto rounded-lg'>
            <h1 className='text-center text-reeva text-4xl font-primary'>
              Daftar Verifikasi Pembayaran Reeva
            </h1>
          </div>
          {/* Table */}
          <TableAdminPembayaran
            dataItems={listPayment?.data?.data_per_page}
            col={COLUMNS}
            max={listPayment?.data?.max_page}
            pages={page}
            color='bg-reeva'
            setPage={setPage}
            per_page={per_page}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
