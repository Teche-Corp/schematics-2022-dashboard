import DashboardAdminShell from '@/layout/DashboardAdminShell';
import Input from '@/components/Input';
import { FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import SelectInput from '@/components/SelectInput';

import { NLC_REGION } from '@/lib/constants';

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
              <h2 className='font-primary text-2xl text-white mb-2'>
                Detail TIM
              </h2>
              <Input
                value='TIM NAGA API'
                type='text'
                placeholder='Nama Tim'
                disabled='true'
                label='Nama Tim'
                id='Nama'
                validation={{ required: 'Nama Tim tidak boleh kosong' }}
              />
              <Input
                value='SMAN 1 Surabaya'
                type='text'
                placeholder='Asal Sekolah'
                disabled='true'
                label='Asal Sekolah'
                id='Nama'
                validation={{ required: 'Email tidak boleh kosong' }}
              />
              <SelectInput
                value='Surabaya'
                label='Pilihan Region'
                options={NLC_REGION}
                disabled='true'
                id='region'
              />
            </div>
          </form>
        </FormProvider>
        {/* <Input disabled='true' label='Nama' /> */}
      </div>
    </DashboardAdminShell>
  );
}
