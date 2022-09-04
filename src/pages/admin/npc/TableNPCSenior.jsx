import { bearerToken } from '@/lib/helper';
import { useState } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

export default function TableNPCSenior() {
  const page = 1;
  const per_page = 10;
  const url = `/admin_get_list_pembayaran_npc_senior?page=${page}&per_page=${per_page}`;

  const { data, error } = useSWR(
    url,
    {
      headers: { ...bearerToken() },
    },
    // fetcher(url)
  );
  console.log('datanya : ', data?.data?.data_per_page);
  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <h1>Daftar Verifikasi Data Schematics NPC Senior</h1>
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
          <table className='table-auto border-collapse w-full'>
            <thead>
              <tr className='bg-npc text-left  text-white'>
                <th className='text-base font-semibold py-3.5 px-2 pl-4 text-white'>
                  Nama Tim
                </th>
                <th className='text-base font-semibold py-3.5 px-2 pl-4 text-white'>
                  Nama Ketua
                </th>
                <th className='text-base font-semibold py-3.5 px-2 pl-4 text-white'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='text-sm font-normal text-gray-700 undefined'>
              {data?.data?.data_per_page?.map((payment) => {
                return (
                  <tr
                    key={payment.pembayaran_id}
                    className='hover:bg-gray-50  
              border-b border-gray-200'
                  >
                    <td className='px-2 py-4 text-sm '>
                      <Link
                        to={`/admin/verifikasi-data/npc-senior/${payment.pembayaran_id}`}
                      >
                        {payment.nama_tim}{' '}
                      </Link>
                    </td>
                    <td className='px-2 py-4 text-sm '>{payment.nama_ketua}</td>
                    <td className='px-2 py-4 text-sm '>
                      {payment.status_pembayaran}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardAdminShell>
    </>
  );
}
