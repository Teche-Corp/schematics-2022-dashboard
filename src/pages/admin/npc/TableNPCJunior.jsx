import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdmin from '@/components/Admin/Table';

export default function TableNPCJunior() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(50);
  const url = `/admin_get_list_pembayaran_npc_junior?page=${page}&per_page=${per_page}`;
  const { data: listTeam, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  console.log(listTeam);
  if (!listTeam) {
    return <Loading />;
  }
  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <h1>Daftar Verifikasi Data Schematics NLC</h1>

          {/* Table */}

          <TableAdmin
            dataItems={listTeam?.data?.data_per_page}
            max={listTeam?.data?.max_page}
            pages={page}
            setPage={setPage}
            per_page={per_page}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
