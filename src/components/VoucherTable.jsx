import { FaTimes } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const voucher = [
  {
    kode: '67563',
    keterangan: '-',
    potongan: '10',
    limit: '1',
    mulai: '01 JAN 2021',
    akhir: '31 JAN 2021',
    status: 'Tidak Aktif',
  },
  {
    kode: '73733',
    keterangan: '-',
    potongan: '15',
    limit: '2',
    mulai: '01 FEB 2021',
    akhir: '28 FEB 2021',
    status: 'Tidak Aktif',
  },
  {
    kode: '39469',
    keterangan: '-',
    potongan: '50',
    limit: '1',
    mulai: '01 MAR 2021',
    akhir: '31 MAR 2021',
    status: 'Tidak Aktif',
  },
  {
    kode: '13730',
    keterangan: '-',
    potongan: '20',
    limit: '3',
    mulai: '01 APR 2021',
    akhir: '30 APR 2021',
    status: 'Aktif',
  },
  {
    kode: '22817',
    keterangan: '-',
    potongan: '25',
    limit: '2',
    mulai: '01 JUL 2021',
    akhir: '30 JUL 2021',
    status: 'Aktif',
  },
];

export default function VoucherTable() {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-10'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    No
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Kode
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Keterangan
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Potongan
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Limit
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Mulai Tgl
                  </th>
                  <th
                    className='px-15 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Berakhir Tgl
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  >
                    Status
                  </th>
                  <th
                    className='px-6 py-3 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase'
                    scope='col'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {voucher.map((voucher, voucherIdx) => (
                  <tr
                    key={voucher.kode}
                    className={voucherIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='px-6 py-4 text-center text-sm font-medium text-gray-900 whitespace-nowrap'>
                      {voucherIdx + 1}
                    </td>
                    <td className='px-6 py-4 text-center text-sm font-medium text-gray-900 whitespace-nowrap'>
                      {voucher.kode}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      {voucher.keterangan}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      {voucher.potongan}%
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      {voucher.limit}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      {voucher.mulai}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      {voucher.akhir}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      <strong
                        className={
                          voucher.status === 'Aktif'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }
                      >
                        {voucher.status}
                      </strong>
                    </td>
                    <td className='px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap'>
                      <button className='mr-2'>
                        <AiOutlineEdit />
                      </button>
                      <button>
                        <FaTimes className='text-red-500' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
