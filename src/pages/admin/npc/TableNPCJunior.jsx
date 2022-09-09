import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdmin from '@/components/Admin/Table';

export default function TableNPCJunior() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const url = `/admin_list_npc_junior_team?page=${page}&per_page=${per_page}`;
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
              Daftar Verifikasi Team Schematics NPC Junior
            </h1>
          </div>
          {/* Table */}

          <TableAdmin
            dataItems={listTeam?.data?.data_per_page}
            max={listTeam?.data?.max_page}
            pages={page}
            link='sch-npc-junior'
            color='bg-npc'
            setPage={setPage}
            per_page={per_page}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
