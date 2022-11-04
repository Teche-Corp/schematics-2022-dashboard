import { useEffect, useState } from 'react';
import { bearerToken } from '@/lib/helper';
import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ScanQRTicket() {
  const [data, setData] = useState(undefined);
  const [ticket, setTicket] = useState(undefined);
  const urlDetailTicket = `/admin_detail_reeva_ticket`;
  const urlUseTicket = `/admin_use_reeva_ticket`;

  const handleChangeTicket = () => {
    toast.promise(
      axios.post(
        urlUseTicket,
        { ticket_id: data },
        {
          headers: { ...bearerToken(), 'Content-Type': 'application/json' },
        },
      ),
      {
        loading: 'Loading...',
        success: (res) => {
          setData(undefined);
          setTicket(undefined);
          return 'Tiket berhasil ditukarkan';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  useEffect(() => {
    if (data) {
      toast.promise(
        axios.post(
          urlDetailTicket,
          { ticket_id: data },
          {
            headers: { ...bearerToken(), 'Content-Type': 'application/json' },
          },
        ),
        {
          loading: 'Loading...',
          success: (res) => {
            setTicket(res.data.data);
            return 'Tiket ditemukan';
          },
          error: (err) => {
            return err.response.data.message;
          },
        },
      );
    }
  }, [data]);

  return (
    <>
      <DashboardAdminShell>
        <div className='p-8'>
          <div className='bg-white p-4 mx-auto rounded-lg'>
            <h1 className='text-center text-reeva text-4xl font-primary'>
              Scan QR Penukaran Tiket Reeva
            </h1>
          </div>
          <div className='w-full md:w-1/2 mx-auto'>
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result?.text);
                }
              }}
            />
          </div>
          {ticket ? (
            <>
              <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Informasi Tiket
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Detail Informasi Tiket Pembeli
                  </p>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Nama Pembeli
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.name}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Email Pembeli
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.email}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        No Telp Pembeli
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.no_telp}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        NIK Pembeli
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.nik}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Status Tiket
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.is_used
                          ? 'Telah Ditukarkan'
                          : 'Belum Ditukarkan'}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Alamat
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        {ticket.alamat}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              {!ticket.is_used && (
                <div className='w-full py-6 flex justify-center items-center'>
                  <button
                    onClick={handleChangeTicket}
                    type='button'
                    className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-reeva hover:bg-reeva-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reeva-400'
                  >
                    Tukarkan Tiket
                  </button>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </DashboardAdminShell>
    </>
  );
}
