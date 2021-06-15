const people = [
  {
    name: 'Jane Cooper',
    institusi: 'Institut Teknologi Sepuluh Nopember',
    email: 'jane.cooper@example.com',
    event: 'Schematics NLC',
    status: 'Terdaftar',
  },
  {
    name: 'Cody Fisher',
    institusi: 'Universitas Indonesia',
    email: 'cody.fisher@example.com',
    event: 'Schematics NPC',
    status: 'Pending',
  },
];

export default function Table() {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    No
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Nama
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Institusi
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Event
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {people.map((person, personIdx) => (
                  <tr
                    key={person.email}
                    className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                      {personIdx + 1}
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                      {person.name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {person.institusi}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {person.email}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {person.event}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {person.status}
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
