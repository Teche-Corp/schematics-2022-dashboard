import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import GlobalFilter from '@/components/GlobalFilter';

import { classNames } from '@/lib/helper';

export default function VoucherTable({ columns, data, header }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
  );

  return (
    <div className='flex flex-col'>
      <div className='pt-2 pb-6 '>
        <div className='flex flex-col justify-between space-y-4 sm:space-y-0 sm:items-center sm:flex-row'>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {/* <button
            type='button'
            onClick={handleClick}
            className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none'
          >
            Export Excel
          </button> */}
          <Link
            to='/admin/voucher/add'
            className='inline-flex items-center justify-center px-4 py-1 ml-3 text-sm font-medium text-white border border-transparent border-gray-300 rounded-md shadow-sm focus:outline-none bg-dark-700 hover:bg-dark-400 focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
          >
            Tambah Voucher
          </Link>
        </div>
      </div>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            {data === [] ? (
              <div className='text-center'>
                <div className='py-4 text-sm text-gray-900'>
                  Sedang menunggu data...
                </div>
              </div>
            ) : (
              <>
                <table
                  columns={columns}
                  data={data}
                  {...getTableProps()}
                  className='min-w-full divide-y divide-gray-200'
                >
                  <thead className='bg-gray-50'>
                    {headerGroups.map((headerGroup, index) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column) => (
                          <th
                            key={column.id}
                            {...column.getHeaderProps()}
                            className='px-6 py-3 text-xs font-bold tracking-wider text-left text-black uppercase'
                          >
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page?.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className={
                            row.id % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                          }
                          key={index}
                        >
                          {row?.cells?.map((cell, index) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap '
                                key={index}
                              >
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
            <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
              <div className='flex flex-1 sm:hidden'>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className={classNames(
                    'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500  border border-gray-300 rounded-l-md',
                    canPreviousPage
                      ? 'bg-white hover:bg-gray-50'
                      : 'bg-gray-200',
                  )}
                >
                  Previous
                </button>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className={classNames(
                    'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-r-md',
                    canNextPage ? 'bg-white hover:bg-gray-50' : 'bg-gray-200',
                  )}
                >
                  Next
                </button>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Menampilkan halaman
                    <span className='font-medium'> {pageIndex + 1} </span>
                    dari
                    <span className='font-medium'> {pageOptions.length} </span>
                    halaman
                  </p>
                </div>
                <div className='flex space-x-2'>
                  <select
                    value={pageSize}
                    className='block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-dark-400 focus:border-dark-400'
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[10, 25, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Tampilkan {pageSize}
                      </option>
                    ))}
                  </select>
                  <nav
                    className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
                    aria-label='Pagination'
                  >
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className={classNames(
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500  border border-gray-300 rounded-l-md',
                        canPreviousPage
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-gray-200',
                      )}
                    >
                      <span className='sr-only'>Previous</span>
                      <HiChevronLeft className='w-5 h-5' aria-hidden='true' />
                    </button>

                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className={classNames(
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-r-md',
                        canNextPage
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-gray-200',
                      )}
                    >
                      <span className='sr-only'>Next</span>
                      <HiChevronRight className='w-5 h-5' aria-hidden='true' />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
