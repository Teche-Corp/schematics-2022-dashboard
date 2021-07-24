import { useState } from 'react';
import { useAsyncDebounce, useTable, useGlobalFilter } from 'react-table';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <div className='pb-3'>
        <div className='flex space-x-10'>
          <div className='flex'>
            <label className='text-gray-500 '>Cari: </label>
            <input
              value={value || ''}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              className='block px-1 ml-2 border border-black rounded-md shadow-sm focus:outline-none sm:text-sm'
            />
          </div>
          <p className='text-gray-500'>Menampilkan {count} data</p>
        </div>
      </div>
    </>
  );
}

export default function AdminTable({ columns, data, page, pages, setPage }) {
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
  );

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
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
                    {rows?.map((row) => {
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
