import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';

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
  base_bg_color: 'bg-npc',
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
    table_row: 'bg-npc text-white',
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
  const [data, setData] = useState([]);
  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={column}
        rows={row}
        per_page={5}
        table_header='Daftar Pembayaran Schematics NPC'
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
