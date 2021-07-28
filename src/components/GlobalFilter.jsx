import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export default function GlobalFilter({
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
