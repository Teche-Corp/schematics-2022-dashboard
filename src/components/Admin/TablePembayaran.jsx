import { useTable } from 'react-table';
import { COLUMNS_TEAM } from '@/lib/constants';
import { useMemo } from 'react';

export default function TableAdmin({ dataItems, col }) {
  const columns = useMemo(() => col, []);
  const data = useMemo(() => dataItems, []);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
      <table
        {...getTableProps()}
        className='w-full text-sm text-left text-gray-500 dark:text-gray-400'
      >
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  scope='col'
                  className='py-3 px-6'
                >
                  {column.render('Headers')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className='py-4 px-6'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
