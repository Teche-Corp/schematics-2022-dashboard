import React, { useState, useEffect } from 'react';
import Table, { Irow } from 'react-tailwind-table';
import useSWR from 'swr';
import { bearerToken } from '@/lib/helper';
import Loading from '@/components/Loading';
import DashboardAdminShell from '@/layout/DashboardAdminShell';

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

const AdminVerifikasiPembayaranJunior = () => {
  // /api/admin_verify_pembayaran terus ini buat apa?
  const page = 1;
  const per_page = 10;
  const url = `/admin_get_list_pembayaran_npc_junior?page=${page}&per_page=${per_page}`;
  const { data, error } = useSWR(url, {
    headers: { ...bearerToken() },
  });
  if (!data) console.log(error);
  console.log(`data nya: `, data?.data?.data_per_page);

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
    <DashboardAdminShell>
      <div style={{ padding: '20px' }}>
        <Table
          columns={column}
          rows={row}
          per_page={5}
          table_header='Daftar Verifikasi Pembayaran Schematics NPC Junior'
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
    </DashboardAdminShell>
  );
};

export default AdminVerifikasiPembayaranJunior;
