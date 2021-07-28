import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ImSpinner } from 'react-icons/im';

import DashboardAdminShell from '@/layout/DashboardAdminShell';

import { bearerToken } from '@/lib/helper';
import VoucherTable from '@/components/VoucherTable';

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVoucherData = async () => {
      try {
        const res = await axios.post(
          'voucher/list',
          {},
          {
            headers: { ...bearerToken() },
          },
        );

        setData(res.data.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getVoucherData();
  }, []);

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
          if (d.is_active) {
            <span className='text-green-500'>Aktif</span>;
          }
          return <span className='text-red-500'>Tidak</span>;
        },
      },
      {
        Header: 'Edit',
        accessor: (d) => {
          return (
            <Link
              className='font-bold text-nlc'
              id={d?.kode_voucher}
              to={{
                pathname: `/admin/event/sch-nlc/user/${Number(
                  d?.kode_voucher,
                )}/edit`,
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
            <div className='flex items-center'>
              <h2 className='max-w-6xl text-lg font-medium leading-6 text-gray-900'>
                Daftar Voucher
              </h2>
              <div className=''>
                <Link
                  to='/admin/voucher/add'
                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-700 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                >
                  Tambah Voucher
                </Link>
              </div>
            </div>

            {loading ? (
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
