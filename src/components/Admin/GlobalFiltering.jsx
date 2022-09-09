export const GolbalFilteringAdmin = ({ filter, setFilter }) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center py-2 justify-between px-4 mt-4 mb-2 react-table-top '>
      <div className='relative flex items-center mt-3 md:mt-0 table-top-search'>
        <input
          className='text-xs py-2 h-10 px-4 pl-6 w-52 md:w-auto focus:outline-none leading-9 tracking-wide 
			    text-gray-700 border border-gray-300 bg-white rounded-lg'
          type='text'
          name='search'
          placeholder='SEARCH'
          onChange={(e) => setFilter(e.target.value)}
          value={filter || ''}
        />
      </div>
    </div>
    // <span>
    //   Search :{' '}
    //   <input
    //     value={filter || ''}
    //     onChange={(e) => setFilter(e.target.value)}
    //   ></input>
    // </span>
  );
};
