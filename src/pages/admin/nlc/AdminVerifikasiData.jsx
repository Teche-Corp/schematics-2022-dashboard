import DashboardAdminShell from '@/layout/DashboardAdminShell';
import InputAdmin from '@/components/Admin/InputAdmin';
import { FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import SelectInput from '@/components/SelectInput';

import { NLC_REGION } from '@/lib/constants';
import DetailAnggota from '@/components/Admin/DetailAnggota';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import { Redirect, useParams } from 'react-router-dom';

export default function AdminVerifikasiDataNLC() {
  const methods = useForm();
  let { id } = useParams();
  const { handleSubmit } = methods;
  const { data: nlcData, error: nlcError } = useSWR(
    [`/admin_get_nlc_team?team_id=${id}`],
    {
      shouldRetryOnError: false,
      errorRetryInterval: 0,
    },
  );

  // useEffect(() => {
  //   console.log(nlcData);
  // }, [nlcData]);

  if (nlcError) {
    if (nlcError.response.status === 401) {
      return <Redirect to='/admin/login' />;
    }
    return <Redirect to='/admin' />;
  }
  if (!nlcData) {
    return <Loading />;
  }
  const updateTim = (data) => {
    console.log(data);
  };

  return (
    <DashboardAdminShell>
      <div className='w-full min-h-screen p-10 bg-dark-100'>
        {/* Judul */}
        <h1 className='text-center font-primary text-5xl text-white'>
          Verifikasi Pendaftaran NLC
        </h1>
        <FormProvider {...methods}>
          <form
            className='flex justify-center'
            onSubmit={handleSubmit(updateTim)}
          >
            <div className='w-1/2 '>
              <h2 className='font-primary text-2xl text-white mb-2 text-center mt-10'>
                Detail TIM
              </h2>
              <InputAdmin
                value={nlcData?.data?.nama_team}
                type='text'
                placeholder='Nama Tim'
                disabled={true}
                label='Nama Tim'
                id='nama-tim'
                validation={{ required: 'Nama Tim tidak boleh kosong' }}
              />
              <InputAdmin
                value={nlcData?.data?.asal_sekolah}
                type='text'
                placeholder='Asal Sekolah'
                disabled={true}
                label='Asal Sekolah'
                id='nama-sekolah'
                validation={{ required: 'Email tidak boleh kosong' }}
              />
              <SelectInput
                value={nlcData?.data.region}
                label='Pilihan Region'
                options={NLC_REGION}
                disabled={true}
                id='region'
              />
              <InputAdmin
                value={nlcData?.data?.kota}
                type='text'
                placeholder='Kabupaten / Kota'
                disabled={true}
                label='Kabupaten / Kota'
                id='kabupaten-kota'
                validation={{ required: 'Kabupaten / Kota tidak boleh kosong' }}
              />
              <InputAdmin
                value={nlcData?.data?.nama_guru_pendamping}
                type='text'
                placeholder='Guru Pendamping (GP)'
                disabled={true}
                label='Guru Pendamping (GP)'
                id='guru-pendamping'
                validation={{ required: 'Guru pendamping tidak boleh kosong' }}
              />
              <InputAdmin
                value={nlcData?.data?.no_telp_guru_pendamping}
                type='text'
                placeholder='Nomor telpon guru pendamping (GP)'
                disabled={true}
                label='Nomor telpon guru pendamping (GP)'
                id='no-hp-gp'
                validation={{ required: 'Nomor telpon tidak boleh kosong' }}
              />
            </div>
          </form>
        </FormProvider>
        <div>
          {nlcData?.data?.members
            .slice(0)
            .reverse()
            .map((data, index) => (
              <DetailAnggota detailAnggota={data} index={index} key={index} />
            ))}
        </div>
        {/* <Input disabled={true} label='Nama' /> */}
      </div>
    </DashboardAdminShell>
  );
}
