import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import GlobalFilter from '@/components/GlobalFilter';

import { classNames } from '@/lib/helper';

export default function VoucherTable({ columns, data }) {
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
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
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
                    {headerGroups.map((headerGroup) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.id}
                      >
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
                    {page?.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className={
                            row.id % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                          }
                          key={row.id}
                        >
                          {row?.cells?.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap '
                                key={cell.id}
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
                <div>
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
              <br />
              <div>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[1, 10, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
