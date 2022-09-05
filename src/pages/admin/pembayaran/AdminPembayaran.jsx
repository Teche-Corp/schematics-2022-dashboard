import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { bearerToken } from '@/lib/helper';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../../../components/Loading';

const AdminPembayaran = () => {
  const [row, setRow] = useState(undefined);
  const page = 1;
  const per_page = 10;
  const { id } = useParams;
  // const url = [`/admin_get_detail_pembayaran?pembayaran_id=${id}`]
  const { data, error } = useSWR(
    [
      `/admin_get_detail_pembayaran?pembayaran_id=08d7b93b-0bc0-456f-84c1-2ff554fa9d76`,
    ],
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

  if (!data || !row) {
    <Loading />;
  }
  return (
    <>
      <DashboardAdminShell>
        <h1>Test</h1>
      </DashboardAdminShell>
    </>
  );
};

export default AdminPembayaran;
