import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdmin from '@/components/Admin/Table';

export default function TableNPCJunior() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const url = `/admin_list_npc_senior_team?page=${page}&per_page=${per_page}`;
  const { data: listTeam, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  if (!listTeam) {
    return <Loading />;
  }
  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <div className='bg-white p-4 mx-auto rounded-lg'>
            <h1 className='text-center text-npc text-4xl font-primary'>
              Daftar Verifikasi Team Schematics NPC Senior
            </h1>
          </div>
          {/* Table */}

          <TableAdmin
            dataItems={listTeam?.data?.data_per_page}
            max={listTeam?.data?.max_page}
            pages={page}
            link='sch-npc-senior'
            setPage={setPage}
            color='bg-npc'
            per_page={per_page}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
