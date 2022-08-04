import DashboardAdminShell from '@/layout/DashboardAdminShell';
import InputAdmin from '@/components/Admin/InputAdmin';
import { FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import SelectInput from '@/components/SelectInput';

import { NLC_REGION } from '@/lib/constants';
import DetailAnggota from '@/components/Admin/DetailAnggota';

export default function VerifikasiNLC() {
  const methods = useForm();
  const { data, error } = useSWR('/my_nlc');
  return (
    <DashboardAdminShell>
      <div className='w-full min-h-screen p-10 bg-dark-100'>
        {/* Judul */}
        <h1 className='text-center font-primary text-5xl text-white'>
          Verifikasi Pendaftaran NLC
        </h1>
        <FormProvider {...methods}>
          <form className='flex justify-center'>
            <div className='w-1/2 '>
              <h2 className='font-primary text-2xl text-white mb-2 text-center mt-10'>
                Detail TIM
              </h2>
              <InputAdmin
                value='Tim Naga Air'
                type='text'
                placeholder='Nama Tim'
                disabled='true'
                label='Nama Tim'
                id='nama-tim'
                validation={{ required: 'Nama Tim tidak boleh kosong' }}
              />
              <InputAdmin
                value='SMAN 1 Surabaya'
                type='text'
                placeholder='Asal Sekolah'
                disabled='true'
                label='Asal Sekolah'
                id='nama-sekolah'
                validation={{ required: 'Email tidak boleh kosong' }}
              />
              <SelectInput
                value='Surabaya'
                label='Pilihan Region'
                options={NLC_REGION}
                disabled='true'
                id='region'
              />
              <SelectInput
                value='Surabaya'
                label='Pilihan Lokasi'
                options={NLC_REGION}
                disabled='true'
                id='region'
              />
              <InputAdmin
                value={'Kota Malang'}
                type='text'
                placeholder='Kabupaten / Kota'
                disabled='true'
                label='Kabupaten / Kota'
                id='kabupaten-kota'
                validation={{ required: 'Kabupaten / Kota tidak boleh kosong' }}
              />
              <InputAdmin
                value={'Pak Jaya Kusuma Mandiri'}
                type='text'
                placeholder='Guru Pendamping (GP)'
                disabled='true'
                label='Guru Pendamping (GP)'
                id='guru-pendamping'
                validation={{ required: 'Guru pendamping tidak boleh kosong' }}
              />
              <InputAdmin
                value={'0852-898-898'}
                type='text'
                placeholder='Nomor telpon guru pendamping (GP)'
                disabled='true'
                label='Nomor telpon guru pendamping (GP)'
                id='no-hp-gp'
                validation={{ required: 'Nomor telpon tidak boleh kosong' }}
              />
            </div>
          </form>
        </FormProvider>
        {/* Detail Anggota */}
        <DetailAnggota />
        {/* <Input disabled='true' label='Nama' /> */}
      </div>
    </DashboardAdminShell>
  );
}
