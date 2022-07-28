import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';
import { toast } from 'react-hot-toast';
import { bearerToken, defaultToastMessage } from '@/lib/helper';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import GetPembayaranNLC from '@/components/Infrastructure/GetPembayaranNLC';
import useSWR from 'swr';

const column = [
  {
    // field: "front_end_position.name.full_name",
    // use: "Position",
    field: 'front_end_position.name.full_name',
    use: 'Nama Ketua Tim',
    //Will not be used in search filtering
    //  use_in_search:false
  },
  {
    field: 'name',
    use: 'Nama Bank',
  },
  {
    field: 'status',
    use: 'Status Pembayaran',

    //Will not be displayed in the table
    use_in_display: true,
  },
  {
    field: 'team',
    use: 'Nama Tim',
  },
];

const row = [];

const tableStyling = {
  base_bg_color: 'bg-nlc',
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
    table_row: 'bg-nlc text-white',
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

const AdminPagination = () => {
  const history = useHistory();

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const formData = new FormData();

  axios.defaults.baseURL = `https://schematics.its.ac.id:8081/api`;
  const page = 1;
  const per_page = 10;
  const { data, error } = useSWR(
    `/admin_get_list_pembayaran_nlc?page=${page}&per_page=${per_page}`,
    {
      headers: { ...bearerToken() },
    },
  );
  console.log('datanya : ', data);
  if (!data) console.log(error);

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={column}
        // rows={handleData}
        rows={row}
        per_page={5}
        table_header='Daftar Pembayaran Schematics NLC'
        bulk_select_options={['Save', 'Delete', 'Update']}
        striped={true}
        bordered={true}
        hovered={true}
        styling={tableStyling}
      ></Table>
    </div>
  );
};

export default AdminPagination;
