import { bearerToken } from '@/lib/helper';
import { useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdminPembayaran from '@/components/Admin/TablePembayaran';

export default function TableNPCPaymentSenior() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const url = `/admin_get_list_pembayaran_npc_senior?page=${page}&per_page=${per_page}`;
  const { data: listTeam, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });

  if (!listTeam) {
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
      Headers: 'Nama Tim',
      accessor: 'nama_tim',
    },
    {
      Headers: 'Nama Ketua',
      accessor: 'nama_ketua',
    },
    {
      Headers: 'Nama Bank',
      accessor: 'nama_bank',
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
            <h1 className='text-center text-npc text-4xl font-primary'>
              Daftar Verifikasi Pembayaran Schematics NPC Junior
            </h1>
          </div>
          {/* Table */}
          <TableAdminPembayaran
            dataItems={listTeam?.data?.data_per_page}
            col={COLUMNS}
            max={listTeam?.data?.max_page}
            pages={page}
            setPage={setPage}
            per_page={per_page}
            color='bg-npc'
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
