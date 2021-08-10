import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

import { classNames } from '@/lib/helper';

import GlobalFilter from '@/components/GlobalFilter';

export default function AdminTable({
  columns,
  data,
  header,
  page,
  pages,
  setPage,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
    },
    useGlobalFilter,
    useSortBy,
  );

  return (
    <div className='flex flex-col'>
      <div className='pt-2 pb-6 '>
        <div className='flex flex-col justify-between space-y-4 sm:space-y-0 sm:items-center sm:flex-row'>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div>{header}</div>
        </div>
      </div>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            {data === undefined ? (
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
                  <thead className='bg-gray-200'>
                    {headerGroups.map((headerGroup, index) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column) => (
                          <th
                            key={column.id}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps(),
                            )}
                            className='px-6 py-3 text-xs font-bold tracking-wider text-left text-black uppercase group'
                          >
                            <div className='flex items-center gap-2'>
                              <p className='flex-grow'>
                                {column.render('Header')}
                              </p>
                              <span className='flex flex-col items-center justify-center'>
                                <GoTriangleUp
                                  className={classNames(
                                    'transition-colors',
                                    column.isSorted
                                      ? column.isSortedDesc
                                        ? // sorted desc
                                          'text-transparent'
                                        : // sorted asc
                                          'text-gray-700'
                                      : // not sorted
                                        'group-hover:text-gray-400 text-transparent',
                                  )}
                                />
                                <GoTriangleDown
                                  className={classNames(
                                    '-mt-1 transition-colors',
                                    column.isSorted
                                      ? column.isSortedDesc
                                        ? // sorted desc
                                          'text-gray-700'
                                        : // sorted asc
                                          'text-transparent'
                                      : // not sorted
                                        'group-hover:text-gray-400 text-transparent',
                                  )}
                                />
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows?.map((row, index) => {
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
                  onClick={() => {
                    if (page === 1) return;
                    setPage(page - 1);
                  }}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500  border border-gray-300 rounded-l-md ${
                    page === 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
                  } `}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (page >= pages) return;
                    setPage(page + 1);
                  }}
                  disabled={page === pages}
                  className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 ${
                    page === pages ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
                  } border border-gray-300 rounded-r-md `}
                >
                  Next
                </button>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Menampilkan halaman
                    <span className='font-medium'> {page}</span>
                  </p>
                </div>
                <div>
                  <nav
                    className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
                    aria-label='Pagination'
                  >
                    <button
                      onClick={() => {
                        if (page === 1) return;
                        setPage(page - 1);
                      }}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500  border border-gray-300 rounded-l-md ${
                        page === 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
                      } `}
                    >
                      <span className='sr-only'>Previous</span>
                      <HiChevronLeft className='w-5 h-5' aria-hidden='true' />
                    </button>

                    <button
                      onClick={() => {
                        if (page >= pages) return;
                        setPage(page + 1);
                      }}
                      disabled={page === pages}
                      className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 ${
                        page === pages
                          ? 'bg-gray-200'
                          : 'bg-white hover:bg-gray-50'
                      } border border-gray-300 rounded-r-md `}
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
