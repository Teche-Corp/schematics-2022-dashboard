import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from 'react-table';
import { COLUMNS_TEAM } from '@/lib/constants';
import { useMemo } from 'react';
import { GolbalFilteringAdmin } from './GlobalFiltering';
import { useHistory } from 'react-router-dom';

export default function TableAdmin({
  dataItems,
  max,
  pages,
  setPage = '',
  per_page,
}) {
  const history = useHistory();

  const columns = useMemo(() => COLUMNS_TEAM, []);
  const data = dataItems;
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: per_page,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  function goto(href) {
    history.push(`/admin/sch-nlc/verifikasi/${href}`);
  }

  const { globalFilter, pageSize } = state;
  return (
    <>
      <GolbalFilteringAdmin filter={globalFilter} setFilter={setGlobalFilter} />
      <div className='overflow-auto relative shadow-md sm:rounded-lg max-h-screen'>
        <table
          {...getTableProps()}
          className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '
        >
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope='col'
                    className='py-3 px-6 '
                  >
                    {column.render('Headers')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? '🔽'
                          : '🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200'
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className='py-4 px-6 cursor-pointer '
                      onClick={() => goto(cell.row.original.team_id)}
                    >
                      {cell.render('Cell')}
                      {/* {console.log(cell.row.original)} */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center'>
        <nav aria-label='Page navigation' className=' p-2 overflow-auto w-1/2'>
          <ul className='inline-flex -space-x-px '>
            {[...Array(max)].map((e, i) => {
              return (
                <li
                  className='py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  key={i}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </li>
              );
            })}
          </ul>
        </nav>
        <p className='px-4'>
          Halaman {pages} dari {max} ({pageSize} items)
        </p>
      </div>
    </>
  );
}
