import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { HiCheckCircle, HiOfficeBuilding, HiUserGroup } from 'react-icons/hi';
import { FaMoneyCheck } from 'react-icons/fa';

const cards = [
  {
    name: 'Total Pendaftaran',
    href: '#',
    icon: HiUserGroup,
    amount: '3',
  },
  {
    name: 'Total Pendapatan',
    href: '#',
    icon: FaMoneyCheck,
    amount: 'Rp.30.000',
  },
];

export default function AdminNLC() {
  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto'>
        {/* Page header */}
        <div className='bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center'>
                  <div>
                    <div className='flex items-center'>
                      <h1 className='text-2xl font-bold leading-7 text-gray-900 md:ml-3 sm:leading-9 sm:truncate'>
                        Hello, Admin Schematics NLC 2021
                      </h1>
                    </div>
                    <dl className='flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                      <dt className='sr-only'>Company</dt>
                      <dd className='flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6'>
                        <HiOfficeBuilding
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        Institut Teknologi Sepuluh Nopember
                      </dd>
                      <dt className='sr-only'>Account status</dt>
                      <dd className='flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0'>
                        <HiCheckCircle
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-400'
                          aria-hidden='true'
                        />
                        Akun Admin
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              {/* <div className='flex mt-6 space-x-3 md:mt-0 md:ml-4'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Add money
                </button>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                >
                  Send money
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className='mt-8 '>
          {/* children */}
          <div className='max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 '>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Statistik Pendaftaran
            </h2>
            <div className='grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className='overflow-hidden bg-white rounded-lg shadow'
                >
                  <div className='p-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <card.icon
                          className='w-6 h-6 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex-1 w-0 ml-5 '>
                        <dl>
                          <dt className='text-sm font-medium text-gray-500 truncate'>
                            {card.name}
                          </dt>
                          <dd>
                            <div className='text-lg font-medium text-gray-900'>
                              {card.amount}
                            </div>
                          </dd>
                          <p className='text-xs text-gray-900'>
                            {card.date ?? undefined}
                          </p>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6'>
            <h2 className='mx-auto text-lg font-medium leading-6 text-gray-900 max-w-7xl mt-7 '>
              Tabel Pendaftaran
            </h2>
            {/****  TABLE START HERE  *****/}
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
                            Region
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Nama Tim
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Verified
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Sekolah
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Kota
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Provinsi
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            Anggota 1
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase '
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((person, personIdx) => (
                          <tr
                            key={person.email}
                            className={
                              personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                          >
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                              {personIdx + 1}
                            </td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap'>
                              {person.region}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                              {person.namaTim}
                            </td>
                            <td
                              className={`px-6 py-4 text-sm font-medium ${
                                person.verified === 'Yes'
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              } whitespace-nowrap`}
                            >
                              {person.verified}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                              {person.sekolah}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                              {person.kota}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                              {person.provinsi}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                              {person.anggota}
                            </td>
                            <td className='px-6 py-4 text-sm text-indigo-500 hover:text-indigo-400 whitespace-nowrap'>
                              Edit
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/****  TABLE END HERE  *****/}
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}

const dummyData = [
  {
    region: 'Jawa Barat',
    namaTim: 'Doa Ibu',
    verified: 'Yes',
    sekolah: 'SMAN 3 BEKASI',
    kota: 'BEKASI',
    provinsi: 'Jawa Barat',
    anggota: 'Rizqi Tsani - tsani@mail.com - 0813837162 - tsaniii',
  },
  {
    region: 'Jawa Barat',
    namaTim: 'Cloud Inside',
    verified: 'Yes',
    sekolah: 'SMAN 1 BEKASI',
    kota: 'BEKASI',
    provinsi: 'Jawa Barat',
    anggota: 'Theodorus Clarence - clarance@mail.com - 0813837162 - clarenceee',
  },
  {
    region: 'Jawa Barat',
    namaTim: "Child's Play",
    verified: 'No',
    sekolah: 'SMAN 2 BEKASI',
    kota: 'BEKASI',
    provinsi: 'Jawa Barat',
    anggota: 'Agus Budi - agus@mail.com - 0813837162 - agusss',
  },
];
