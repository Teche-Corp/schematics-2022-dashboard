import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';
import { toast } from 'react-hot-toast';
import { bearerToken, defaultToastMessage } from '@/lib/helper';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import GetPembayaranNLC from '@/components/Infrastructure/GetPembayaranNLC';
import useSWR from 'swr';
import Loading from '@/components/Loading';

const column = [
  {
    // field: "front_end_position.name.full_name",
    // use: "Position",
    field: 'team.name.lead_name',
    use: 'Nama Ketua Tim',
    //Will not be used in search filtering
    use_in_search: true,
  },
  {
    field: 'id',
    use: 'pembayaran id',
    use_in_display: false,
  },
  {
    field: 'team.name.bank',
    use: 'Nama Bank',
  },
  {
    field: 'status',
    use: 'Status Pembayaran',
    //Will not be displayed in the table
    use_in_display: true,
  },
  {
    field: 'team.name.name_team',
    use: 'Nama Tim',
    use_in_search: true,
  },
];

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
  const [perPage] = useState(10);
  const [loadingData, setLoadingData] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const formData = new FormData();

  // axios.defaults.baseURL = `https://schematics.its.ac.id:8081/api`;

  // const fetcher = (url) => {
  //   axios.get(url).then((res) => console.log(res))
  // }

  const page = 1;
  const per_page = 10;
  const url = `/admin_get_list_pembayaran_nlc?page=${page}&per_page=${per_page}`;
  const { data, error } = useSWR(
    url,
    {
      headers: { ...bearerToken() },
    },
    // fetcher(url)
  );
  console.log('datanya : ', data?.data?.data_per_page);
  if (!data) console.log(error);

  const [row, setRow] = useState(undefined);

  useEffect(() => {
    if (data) {
      let rowMap = data?.data?.data_per_page?.map((payment) => {
        return {
          id: payment?.pembayaran_id,
          team: {
            name: {
              lead_name: payment.nama_ketua,
              bank: payment.nama_bank,
              name_team: payment.nama_tim,
            },
          },
          status: payment.status_pembayaran,
        };
      });
      console.log('row map :', rowMap);
      setRow(rowMap);
    }
  }, [data]);
  if (!data || !row) {
    return <Loading />;
  }
  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={column}
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
