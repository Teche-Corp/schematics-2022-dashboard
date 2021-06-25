import { FormProvider, useForm } from 'react-hook-form';

import DashboardAdminShell from '@/layout/DashboardAdminShell';
import LightInput from '@/components/LightInput';

import { HiCheckCircle, HiOfficeBuilding } from 'react-icons/hi';

export default function Admin() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const handleCreateVoucher = (data) => {
    console.log(data);
  };

  return (
    <DashboardAdminShell>
      <main className='relative z-0 flex-1 pb-8 overflow-y-auto'>
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
                    <div className='grid grid-cols-3 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='col-span-2 sm:col-span-5'>
                        <LightInput
                          label='Kode Voucher'
                          id='kode-voucher'
                          type='text'
                          validation={{
                            required: 'Kode voucher tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='col-span-1 sm:col-span-1'>
                        <LightInput
                          label='Aktivasi Voucher'
                          id='status-voucher'
                          type='checkbox'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Limit Jumlah'
                          id='limit-jumlah'
                          type='number'
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
                        <LightInput
                          label='Waktu Mulai'
                          id='waktu-mulai'
                          type='date'
                          min={new Date().toISOString().slice(0, 10)}
                          validation={{
                            required: 'Waktu mulai tidak boleh kosong',
                          }}
                        />
                      </div>

                      <div className='sm:col-span-3'>
                        <LightInput
                          label='Waktu Berakhir'
                          id='waktu-berakhir'
                          type='date'
                          min={new Date().toISOString().slice(0, 10)}
                          validation={{
                            required: 'Waktu berakhir tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
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
                    name='keterangan'
                    id='keterangan'
                    rows='3'
                    className='block w-full border-gray-300 rounded-md shadow-sm sm:text-sm'
                  ></textarea>
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
