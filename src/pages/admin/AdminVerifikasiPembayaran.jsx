import InputAdmin from '@/components/Admin/InputAdmin';
import Loading from '@/components/Loading';
import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function AdminVerifikasiPembayaranNlc() {
  const methods = useParams();
  const { handleSubmit } = methods;
  const { id } = useParams();
  const { data: detailPembayaran, error: ErrorPembayaran } = useSWR(
    `/admin_get_detail_pembayaran?pembayaran_id=${id}`,
  );

  if (!detailPembayaran) {
    <Loading />;
  }
  return (
    <>
      <DashboardAdminShell>
        <div className='w-full min-h-screen p-10 bg-dark-100'>
          {/* Judul */}
          <h1 className='text-center font-primary text-5xl text-white'>
            Verifikasi Pembayaran NLC
          </h1>
          <div className=''>
            <div className='mt-10 text-xl flex flex-col '>
              <label className='p-2 mr-8 text-white'>Nama Tim :</label>
              <input
                readOnly={true}
                className='p-2 rounded-sm w-1/2'
                value={detailPembayaran?.data?.nama_tim}
              ></input>
            </div>
            <div className='mt-4 text-xl flex flex-col'>
              <label className='p-2 mr-8 text-white'>Nama Bank :</label>
              <input
                readOnly={true}
                className='p-2 rounded-sm w-1/2'
                value={detailPembayaran?.data?.nama_bank}
              ></input>
            </div>
            <div className='mt-4 text-xl flex flex-col'>
              <label className='p-2 mr-8 text-white'>Nama Ketua :</label>
              <input
                readOnly={true}
                className='p-2 rounded-sm w-1/2'
                value={detailPembayaran?.data?.nama_ketua}
              ></input>
            </div>
            <div className='mt-4 text-xl flex flex-col'>
              <label className='p-2 mr-8 text-white'>Nama Telp Ketua :</label>
              <input
                readOnly={true}
                className='p-2 rounded-sm w-1/2'
                value={detailPembayaran?.data?.no_telp_ketua}
              ></input>
            </div>
            <div className='mt-4 text-xl flex flex-col'>
              <label className='p-2 mr-8 text-white'>Biaya :</label>
              <input
                readOnly={true}
                className='p-2 rounded-sm w-1/2'
                value={detailPembayaran?.data?.biaya}
              ></input>
            </div>
          </div>
        </div>
      </DashboardAdminShell>
    </>
  );
}
