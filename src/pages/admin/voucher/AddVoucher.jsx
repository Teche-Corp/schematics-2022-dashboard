import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import LightInput from '@/components/LightInput';
import CheckboxInput from '@/components/CheckboxInput';
import DatePickerInput from '@/components/DatePickerInput';

import { bearerToken } from '@/lib/helper';

export default function AddVoucher() {
  const history = useHistory();

  const methods = useForm();
  const { watch, handleSubmit, register } = methods;

  const handleCreateVoucher = async (data) => {
    const newBody = {
      kode_voucher: data['kode-voucher'],
      keterangan: data['keterangan'],
      potongan_persen: data['potongan-persen'],
      limit_jumlah: data['limit-jumlah'],
      tanggal_mulai: data['waktu-mulai'],
      tanggal_berakhir: data['waktu-berakhir'],
      is_active: data['status-voucher'],
    };

    toast.promise(
      axios
        .post('/voucher/create', newBody, {
          headers: { ...bearerToken() },
        })
        .then((res) => {
          history.push('/admin/voucher');
        }),
      {
        loading: 'Loading...',
        success: 'Berhasil membuat voucher!',
        error: (err) => err.response.data.msg,
      },
    );
  };

  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto bg-white border-t'>
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <FormProvider {...methods}>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit(handleCreateVoucher)}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <h1 className='mb-6 text-xl font-medium tracking-tight text-gray-900'>
                      Buat Voucher
                    </h1>
                    <div className='flex col-span-6 mt-6 gap-y-6 gap-x-4'>
                      <div className='flex-grow'>
                        <LightInput
                          label='Kode Voucher'
                          id='kode-voucher'
                          type='text'
                          validation={{
                            required: 'Kode voucher tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='flex-shrink-0'>
                        <CheckboxInput
                          id='status-voucher'
                          label='Aktivasi Voucher'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Limit Jumlah'
                          id='limit-jumlah'
                          type='number'
                          min='0'
                          validation={{
                            required: 'Limit jumlah tidak boleh kosong',
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Format nilai tidak valid',
                            },
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Potongan Persen'
                          id='potongan-persen'
                          type='number'
                          min='0'
                          max='100'
                          validation={{
                            required: 'Potongan persen tidak boleh kosong',
                            pattern: {
                              value: /^[0-9]$|^[1-9][0-9]$|^(100)$/,
                              message:
                                'Potongan persen harus bernilai di antara 0 sampai 100 dan bilangan bulat',
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <DatePickerInput
                          id='waktu-mulai'
                          label='Waktu Mulai'
                          todayButton='Hari Ini'
                          validation={{
                            required: 'Waktu mulai tidak boleh kosong',
                          }}
                          selectsStart
                          startDate={watch('waktu-mulai')}
                          endDate={watch('waktu-berakhir')}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <DatePickerInput
                          id='waktu-berakhir'
                          label='Waktu Berakhir'
                          todayButton='Hari Ini'
                          validation={{
                            required: 'Waktu berakhir tidak boleh kosong',
                          }}
                          selectsEnd
                          startDate={watch('waktu-mulai')}
                          endDate={watch('waktu-berakhir')}
                          minDate={watch('waktu-mulai')}
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 mt-6 gap-y-1'>
                      <label
                        htmlFor='keterangan'
                        className='block text-sm font-normal text-gray-700'
                      >
                        Keterangan
                      </label>
                      <textarea
                        {...register('keterangan')}
                        name='keterangan'
                        id='keterangan'
                        rows='3'
                        className='block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-dark-400 focus:border-dark-400'
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-end'>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-dark-700 hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-400'
                    >
                      Buat Voucher
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </DashboardAdminShell>
  );
}
