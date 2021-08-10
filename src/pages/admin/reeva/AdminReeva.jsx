import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCloud, HiUserGroup } from 'react-icons/hi';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import UnstyledLink from '@/components/UnstyledLink';
import AdminTable from '@/components/AdminTable';

import { bearerToken } from '@/lib/helper';

export default function AdminReeva() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();

  const getTeamData = async () => {
    const res = await axios
      .get(`/admin/list/tim/nlc?page=${page}`, {
        headers: { ...bearerToken() },
      })
      .catch((err) => err);

    if (res.status === 200) {
      setPages(res?.data?.data?.total_page);

      setData(res?.data?.data?.teams);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    getTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const cards = [
    {
      name: 'Total Pendaftaran',
      href: '#',
      icon: HiUserGroup,
      amount: data?.length || 'Menunggu data..',
    },

    {
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
        Header: 'Edit',
        Cell: (d) => {
          return (
            <Link
              className='font-bold text-reeva'
              id={d?.row?.id}
              to={{
                pathname: `/admin/sch-nlc/user/${Number(d?.row?.id) + 1}/edit`,
                state: {
                  page: page,
                },
              }}
            >
              Edit
            </Link>
          );
        },
      },
      {
        Header: 'Verified',
        accessor: (d) => {
          if (d.bukti_pembayaran?.is_verified) {
            <span className='text-green-500'>Ya</span>;
          }
          return <span className='text-red-500'>Tidak</span>;
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
            </UnstyledLink>
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
            <h2 className='mx-auto text-lg font-medium leading-6 text-gray-900 max-w-7xl mt-7 '>
              Tabel Pendaftaran
            </h2>

            <AdminTable
              columns={columns}
              data={data}
              page={page}
              pages={pages}
              setPage={setPage}
            />
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
