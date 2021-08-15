import { Fragment, useMemo, useState } from 'react';
import useSWR from 'swr';
import ReactTooltip from 'react-tooltip';
import { Menu, Transition } from '@headlessui/react';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { ImSpinner } from 'react-icons/im';
import toast from 'react-hot-toast';
import axios from 'axios';
import { format } from 'date-fns';
import localeID from 'date-fns/locale/id';

import useLoadingToast from '@/hooks/useLoadingToast';
import { emptyPostWithToken } from '@/lib/swr';
import { bearerToken, classNames, defaultToastMessage } from '@/lib/helper';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import VoucherTable from '@/components/VoucherTable';
import VoucherAlert from '@/components/Alert/VoucherAlert';

export default function Voucher() {
  const [isOpenActiveAlert, setIsOpenActiveAlert] = useState(false);
  const [isOpenDeactiveAlert, setIsOpenDeactiveAlert] = useState(false);
  const [activeId, setActiveId] = useState('');

  const isLoading = useLoadingToast();

  const { data: dataSWR, isValidating, revalidate } = useSWR(
    '/voucher/list',
    emptyPostWithToken,
  );
  const revalidateTable = isValidating ? null : () => revalidate();
  const data = dataSWR?.data ?? [];

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: (_row, i) => i + 1,
      },
      {
        Header: 'Kode',
        accessor: 'kode_voucher',
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
      },
      {
        Header: 'Potongan',
        accessor: 'potongan_persen',
      },
      {
        Header: 'Limit',
        accessor: 'limit_jumlah',
      },
      {
        Header: 'Tanggal Mulai',
        accessor: (d) => {
          let formattedTime = new Date(d.tanggal_mulai);
          formattedTime.setHours(formattedTime.getHours() + 7);

          return (
            <p>
              {format(formattedTime, 'dd MMMM yyyy HH:mm:ss', {
                locale: localeID,
              })}
            </p>
          );
        },
      },
      {
        Header: 'Tanggal Berakhir',
        accessor: (d) => {
          let formattedTime = new Date(d.tanggal_berakhir);
          formattedTime.setHours(formattedTime.getHours() + 7);

          return (
            <p>
              {format(formattedTime, 'dd MMMM yyyy HH:mm:ss', {
                locale: localeID,
              })}
            </p>
          );
        },
      },
      {
        Header: 'Status',
        accessor: (d) => {
          return d.is_active ? (
            <span className='text-green-500'>Aktif</span>
          ) : (
            <span className='text-red-500'>Tidak</span>
          );
        },
      },
      {
        Header: 'Edit',
        accessor: (d) => {
          return (
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'>
                  <IoMdMore
                    className='w-5 h-5 text-dark-100 hover:text-dark-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='px-1 py-1 '>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type='button'
                          disabled={isLoading}
                          onClick={
                            d.is_active
                              ? () => {
                                  setActiveId(d.kode_voucher);
                                  setIsOpenDeactiveAlert(true);
                                }
                              : () => {
                                  setActiveId(d.kode_voucher);
                                  setIsOpenActiveAlert(true);
                                }
                          }
                          className={classNames(
                            active && 'bg-gray-100',
                            isLoading && 'cursor-wait',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900',
                          )}
                        >
                          {d.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleActivate = (id) => {
    toast.promise(
      axios
        .post(
          '/voucher/activate',
          { kode_voucher: id },
          {
            headers: { ...bearerToken() },
          },
        )
        .then(() => {
          revalidateTable();
          setIsOpenActiveAlert(false);
        }),
      {
        ...defaultToastMessage,
        success: 'Voucher berhasil diaktifkan',
      },
    );
  };

  const handleDeactivate = (id) => {
    toast.promise(
      axios
        .post(
          '/voucher/deactivate',
          { kode_voucher: id },
          {
            headers: { ...bearerToken() },
          },
        )
        .then(() => {
          revalidateTable();
          setIsOpenDeactiveAlert(false);
        }),
      {
        ...defaultToastMessage,
        success: 'Voucher berhasil dinonaktifkan',
      },
    );
  };

  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto border-t'>
        <VoucherAlert
          action={() => {
            handleActivate(activeId);
          }}
          open={isOpenActiveAlert}
          setOpen={setIsOpenActiveAlert}
          type='activate'
        />
        <VoucherAlert
          action={() => {
            handleDeactivate(activeId);
          }}
          open={isOpenDeactiveAlert}
          setOpen={setIsOpenDeactiveAlert}
          type='deactivate'
        />
        <div className='mt-8 '>
          <div className='max-w-6xl px-4 mx-auto space-y-3 sm:px-6'>
            <div className='flex items-center justify-between'>
              <div className='flex space-x-2'>
                <h1 className='text-2xl font-bold leading-6 text-gray-900'>
                  Daftar Voucher
                </h1>
                <button
                  data-for='refresh'
                  data-tip='Refresh data tabel'
                  disabled={isLoading}
                  onClick={revalidateTable}
                  className='p-1 text-lg font-bold rounded-full focus:outline-none focus:ring ring-black'
                >
                  <IoMdRefresh
                    className={classNames(isValidating && 'animate-spin')}
                  />
                </button>
                <ReactTooltip
                  id='refresh'
                  delayHide={100}
                  place='right'
                  type='dark'
                  effect='solid'
                />
              </div>
            </div>

            {!dataSWR ? (
              <div className='flex justify-center py-10 mt-4'>
                <div>
                  <ImSpinner className='mx-auto mb-3 text-gray-700 w-7 h-7 animate-spin' />
                  <p>Sedang menunggu data...</p>
                </div>
              </div>
            ) : (
              <VoucherTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
