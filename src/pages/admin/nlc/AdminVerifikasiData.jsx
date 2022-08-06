import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';
import { toast } from 'react-hot-toast';
import { bearerToken, defaultToastMessage } from '@/lib/helper';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import axios from 'axios';

const column = [
  {
    field: 'front_end_position.name.full_name',
    use: 'Nama Tim',
    //Will not be used in search filtering
    //  use_in_search:false
  },
  {
    field: 'name',
    use: 'Nama Ketua',
  },
  {
    field: 'country_id',
    use: 'Status Tim',

    //Will not be displayed in the table
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

const AdminVerifikasiDataNLC = () => {
  let member_id;
  let new_status;

  // if (member_id === undefined && new_status === undefined) {
  //   url = `/admin_verify_nlc_member?member_id=${member_id}&new_status=${new_status}`;
  // }
  const handleAdminVerifikasiData = () => {
    const url = `/admin_verify_nlc_member?member_id=${member_id}&new_status=${new_status}`;
    // if (member_id !== undefined && new_status !== undefined) {
    toast.promise(
      axios
        .post(url, { headers: { ...bearerToken() } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }),
    );
    // }
  };

  handleAdminVerifikasiData();
  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={column}
        rows={[]}
        per_page={5}
        table_header='Daftar Verifikasi Data Schematics NLC'
        bulk_select_options={['Save', 'Delete', 'Update']}
        // export_csv_file = "FuckThisShit"
        // on_bulk_action={tableBulkClick}
        // should_export={true}
        // on_search={onSearch}
        show_search={true}
        // export_modify={exportModify}
        striped={true}
        bordered={true}
        hovered={true}
        styling={tableStyling}
        // row_render={this.rowcheck}
        // bulk_select_button_text="Apply"
      ></Table>
    </div>
  );
};

export default AdminVerifikasiDataNLC;
