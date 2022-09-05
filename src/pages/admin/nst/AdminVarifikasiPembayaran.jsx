import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';
import { bearerToken, defaultToastMessage } from '@/lib/helper';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import axios from 'axios';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

const column = [
  {
    field: 'id',
    use: 'pembayaran id',
    use_in_display: false,
  },
  {
    field: 'order_id',
    use: 'order id',
    use_in_display: false,
  },
  {
    field: 'nama',
    use: 'Nama Pemsan',
    use_in_search: true,
  },
  {
    field: 'nama_bank',
    use: 'Nama Bank',
  },
  {
    field: 'jumlah',
    use: 'Jumlah Tiket',
    use_in_display: true,
  },
  {
    field: 'status',
    use: 'Status Pembayaran',
    use_in_display: true,
  },
];

const tableStyling = {
  base_bg_color: 'bg-nst',
  base_text_color: 'text-green-600',
  top: {
    // title:"text-red-700"
    elements: {
      // main: "bg-green-700",
      // search: "text-white",
      bulk_select: {
        // main:"bg-green-700 text-white",
        // button:"bg-yellow-700 text-black px-5 "
      },
      // export:"text-yellow-800"
    },
  },
  table_head: {
    table_row: 'bg-nst text-white',
    table_data: 'text-white',
  },
  table_body: {
    // main:"bg-red-600",
    // table_row:"text-yellow-900",
    // table_data: "text-base"
  },
  footer: {
    // main: "bg-yellow-700",
    statistics: {
      // main: "bg-white text-green-900",
      // bold_numbers:"text-yellow-800 font-thin"
    },
    // page_numbers:"bg-red-600 text-white"
  },
};

const AdminVerifikasiPembayran = () => {
  const methods = useForm();
  const [row, setRow] = useState(undefined);

  const page = 1;
  const per_page = 10;
  const url = `/admin_get_list_pembayaran_nst?page=${page}&per_page=${per_page}`;

  const { data, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  console.log('datanya :', data?.data?.data_per_page);
  if (!data) console.log(error);

  useEffect(() => {
    if (data) {
      let rowData = data?.data?.data_per_page?.map((payment) => {
        return {
          id: payment?.pembayaran_id,
          order_id: payment?.order_id,
          nama: payment?.nama_pemesan,
          nama_bank: payment?.nama_bank,
          jumlah: payment?.jumlah_ticket,
          status: payment?.status_pembyaran, // undefined ??
        };
      });
      setRow(rowData);
    }
  }, [data]);

  if (!data || !row) {
    <Loading />;
  }

  return (
    <>
      <DashboardAdminShell>
        <div style={{ padding: '20px' }}>
          <Table
            columns={column}
            rows={row}
            per_page={5}
            table_header='Daftar Pembayaran Schematics NST'
            striped={true}
            bordered={true}
            hovered={true}
            styling={tableStyling}
          ></Table>
        </div>
      </DashboardAdminShell>
    </>
  );
};

export default AdminVerifikasiPembayran;
