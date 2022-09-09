import { bearerToken } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

// Import UseTable
import Loading from '@/components/Loading';
import TableAdmin from '@/components/Admin/Table';

export default function TableNLCTeam() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(50);
  const url = `/admin_list_nlc_team?page=${page}&per_page=${per_page}`;
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
            <h1 className='text-center text-nlc text-4xl font-primary'>
              Daftar Verifikasi Team NLC
            </h1>
          </div>
          {/* Table */}

          <TableAdmin
            dataItems={listTeam?.data?.data_per_page}
            max={listTeam?.data?.max_page}
            pages={page}
            setPage={setPage}
            link='sch-nlc'
            color='bg-nlc'
            per_page={per_page}
          />
        </div>
      </DashboardAdminShell>
    </>
  );
}
