import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { bearerToken } from '@/lib/helper';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../../../components/Loading';
import { FormProvider, useForm } from 'react-hook-form';
import InputAdmin from '@/components/Admin/InputAdmin';
import ImageFetch from '@/components/ImageFetch';
import ValidasiAdmin from '@/components/Admin/ValidasiAdmin';

const AdminPembayaran = () => {
  const methods = useForm();
  let { id } = useParams();
  const { handleSubmit } = methods;
  // const url = [`/admin_get_detail_pembayaran?pembayaran_id=${id}`]
  console.log(id);
  const { data, error } = useSWR(
    [`/admin_get_detail_pembayaran?pembayaran_id=${id}`],
    {
      shouldRetryOnError: false,
      errorRetryInterval: 0,
      headers: { ...bearerToken() },
    },
  );

  useEffect(() => {
    if (data) {
      console.log('data :', data);
    }
  }, [data]);

  if (!data) {
    <Loading />;
  }

  const updateTim = (data) => {
    console.log(data);
  };
  /*
  biaya: 135104
  bukti_pembayaran: "NLC/Pembayaran/00a45c4b-93c7-4be7-b185-408d6633a323"
  nama_bank: "bank_bni" ok
  nama_ketua: "Shima Maharani Onessis" ok
  nama_tim: "COCOLEMON" ok
  no_telp_ketua: "+6281249917778" ok
  tipe_pembayaran: "nlc_team" ok
  */
  const validationList = [
    {
      value: 'active',
      text: 'Validasi',
    },
    {
      value: 'need_revision',
      text: 'Tolak Validasi',
    },
  ];
  return (
    <>
      <DashboardAdminShell>
        <div className='w-full min-h-screen p-10 bg-dark-100'>
          <h1 className='text-5xl text-white font-primary text-center'>
            Verifikasi Pembayaran
          </h1>
          <FormProvider {...methods}>
            <form
              className='flex justify-center'
              onSubmit={handleSubmit(updateTim)}
            >
              <div className='w-1/2'>
                <h2 className='font-primary text-2xl text-white mb-2 text-center mt-10'>
                  Detail Pembayaran
                </h2>
                <InputAdmin
                  value={data?.data.nama_tim}
                  type='text'
                  placeholder={data?.data.nama_tim}
                  disabled={true}
                  label='Nama Tim'
                  id='nama_tim'
                  // validation={{required: 'Tipe Pembayaran tidak boleh kosong'}}
                />
                <InputAdmin
                  value={data?.data.nama_ketua}
                  type='text'
                  placeholder={data?.data.nama_ketua}
                  disabled={true}
                  label='Nama Ketua Tim'
                  id='nama_ketua'
                  // validation={{required: 'Nama ketua tidak boleh kosong'}}
                />
                <InputAdmin
                  value={data?.data.no_telp_ketua}
                  type='text'
                  placeholder={data?.data.no_telp_ketua}
                  disabled={true}
                  label='Nomor Telepon'
                  id='nomor_telepon'
                  // validation={{required: 'Nomor telepon tidak boleh kosong'}}
                />
                <InputAdmin
                  value={data?.data.nama_bank}
                  type='text'
                  placeholder={data?.data.nama_bank}
                  disabled={true}
                  label='Nama Bank'
                  id='nama_bank'
                  // validation={{required: 'Nama bank tidak boleh kosong'}}
                />
                <InputAdmin
                  value={data?.data.tipe_pembayaran}
                  type='text'
                  placeholder={data?.data.tipe_pembayaran}
                  disabled={true}
                  label='Tipe Pembayaran'
                  id='tipe_pembayaran'
                  // validation={{required: 'Tipe Pembayaran tidak boleh kosong'}}
                />
                <InputAdmin
                  value={data?.data.biaya}
                  type='text'
                  placeholder={`Rp ${data?.data.biaya}`}
                  disabled={true}
                  label='Total Biaya'
                  id='total_biaya'
                  // validation={{required: 'Toal Biaya tidak boleh kosong'}}
                />
                <ImageFetch
                  imgpath={data?.data.bukti_pembayaran}
                  tag='Bukti Pembayaran'
                />
                <ValidasiAdmin
                  options={validationList}
                  label='Validasi'
                  id='validasi'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </DashboardAdminShell>
    </>
  );
};

export default AdminPembayaran;
