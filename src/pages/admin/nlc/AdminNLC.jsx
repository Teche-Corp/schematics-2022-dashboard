import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { HiCheckCircle, HiOfficeBuilding, HiUserGroup } from 'react-icons/hi';
import { FaMoneyCheck } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [open, setOpen] = useState(false);
  const [accountID, setAccountId] = useState(0);

  console.log(accountID);

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
                  key={card.id}
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
                              {person.anggota.nama} - {person.anggota.email} -{' '}
                              {person.anggota.id_line} -{' '}
                              {person.anggota.phone_number}
                            </td>
                            <td className='px-6 py-4 text-sm text-nlc-400 hover:text-nlc-500 whitespace-nowrap focus:outline-none'>
                              <Link
                                id={person.id}
                                to={`/admin/sch-nlc/user/${person.id}/edit`}
                              >
                                Edit
                              </Link>
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
    id: 1,
    region: 'Jawa Barat',
    namaTim: 'Doa Ibu',
    verified: 'Yes',
    sekolah: 'SMAN 3 BEKASI',
    kota: 'BEKASI',
    provinsi: 'Jawa Barat',
    anggota: {
      nama: 'Rizqi Tsani',
      email: 'tsani@mail.com',
      phone_number: '0813837162',
      id_line: 'tsaniii',
    },
    anggota2: {
      nama: 'Agus Budi',
      email: 'budi@mail.com',
      phone_number: '0813837162',
      id_line: 'budii',
    },
  },
  {
    id: 2,
    region: 'Jawa Timur',
    namaTim: 'TEAM OP',
    verified: 'No',
    sekolah: 'SMAN 3 Surabaya',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    anggota: {
      nama: 'Bobu Tsani',
      email: 'bobu@mail.com',
      phone_number: '0813837162',
      id_line: 'bobuii',
    },
    anggota2: {
      nama: 'Bibu Budi',
      email: 'bibu@mail.com',
      phone_number: '0813837162',
      id_line: 'bibui',
    },
  },
];
