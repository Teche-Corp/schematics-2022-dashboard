import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { bearerToken } from '@/lib/helper';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../../../components/Loading';

const AdminPembayaran = () => {
  let { id } = useParams();
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
  /*
  biaya: 135104
  bukti_pembayaran: "NLC/Pembayaran/00a45c4b-93c7-4be7-b185-408d6633a323"
  nama_bank: "bank_bni"
  nama_ketua: "Shima Maharani Onessis"
  nama_tim: "COCOLEMON"
  no_telp_ketua: "+6281249917778"
  tipe_pembayaran: "nlc_team"
  */
  return (
    <>
      <DashboardAdminShell>
        <p>{data.data.biaya}</p>
      </DashboardAdminShell>
    </>
  );
};

export default AdminPembayaran;
