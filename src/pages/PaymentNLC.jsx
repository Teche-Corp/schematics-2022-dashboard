import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DashboardShell from '@/layout/DashboardShell';
import LightInput from '@/components/LightInput';

import { classNames } from '@/lib/helper';

export default function PaymentNLC() {
  const [currentTab, setCurrentTab] = useState(2);

  const methods = useForm();
  const { handleSubmit } = methods;

  const { handleSubmit: handleSubmit2, register } = useForm();

  const tabs = [
    { name: 'OVO', id: 0 },
    { name: 'Gopay', id: 1 },
    { name: 'Mandiri', id: 2 },
  ];

  const handleTabChange = (e) => {
    setCurrentTab(parseInt(e.target.value));
  };

  const handleAddVoucher = (data) => {
    console.log(data);
  };

  const handleUpload = (data) => {
    console.log(data);
  };

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-5xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
              <span className='block xl:inline'>Pembayaran</span>{' '}
              <span className='block text-nlc xl:inline'>NLC</span>
            </h1>
            <div className='grid grid-cols-1 gap-8 mt-6 sm:grid-cols-6'>
              <div className='sm:col-span-2'>
                <h2 className='text-lg font-semibold'>Total</h2>
                <p className='line-through'>Rp200.000</p>
                <h4 className='text-4xl font-bold'>Rp180.000</h4>
                <form
                  className='mt-5 sm:flex sm:items-center'
                  onSubmit={handleSubmit2(handleAddVoucher)}
                >
                  <div className='w-full sm:max-w-xs'>
                    <label htmlFor='voucher-code' className='sr-only'>
                      Kode Voucher
                    </label>
                    <input
                      {...register('voucher-code')}
                      type='text'
                      name='voucher-code'
                      id='voucher-code'
                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-dark-400 focus:border-dark-400 sm:text-sm'
                      placeholder='Masukkan kode voucher'
                      aria-describedby='voucher-code'
                    />
                  </div>
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Gunakan
                  </button>
                </form>
                <div className='mt-2'>
                  <span className='font-bold'>SCHEMATICS</span> digunakan
                </div>
              </div>

              <div className='sm:col-span-4'>
                {/* UPLOAD BUKTI */}
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(handleUpload)}>
                    <h2 className='text-lg font-semibold'>
                      Upload Bukti Pembayaran
                    </h2>
                    <div className='mt-2 space-y-4 sm:mt-4'>
                      <LightInput
                        label='Nomor Rekening'
                        id='account-id'
                        type='text'
                        validation={{
                          required: 'Nomor Rekening tidak boleh kosong',
                        }}
                      />
                      <div>
                        <label
                          htmlFor='cover_photo'
                          className='block text-sm font-normal text-gray-700'
                        >
                          Bukti Pembayaran
                        </label>
                        <div className='flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md'>
                          <div className='space-y-1 text-center'>
                            <svg
                              className='w-12 h-12 mx-auto text-gray-400'
                              stroke='currentColor'
                              fill='none'
                              viewBox='0 0 48 48'
                              aria-hidden='true'
                            >
                              <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='file-upload'
                                className='relative font-medium bg-white rounded-md cursor-pointer text-nlc hover:text-nlc-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-nlc-400'
                              >
                                <span>Upload a file</span>
                                <input
                                  id='file-upload'
                                  name='file-upload'
                                  type='file'
                                  className='sr-only'
                                />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <button
                          type='submit'
                          className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400'
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </form>
                </FormProvider>
                {/* END OF UPLOAD BUKTI */}
                {/* PETUNJUK */}
                <div>
                  <h2 className='mt-6 text-lg font-semibold sm:mt-2'>
                    Petunjuk Pembayaran
                  </h2>
                  <div className='mt-6 sm:mt-2'>
                    <div className='sm:hidden'>
                      <label htmlFor='tabs' className='sr-only'>
                        Select a tab
                      </label>
                      <select
                        id='tabs'
                        name='tabs'
                        className='block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-dark-400 focus:border-dark-400 sm:text-sm'
                        onChange={handleTabChange}
                        value={currentTab}
                      >
                        {tabs.map((tab) => (
                          <option key={tab.id} value={tab.id}>
                            {tab.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='hidden sm:block'>
                      <div className='border-b border-gray-200'>
                        <nav
                          className='flex -mb-px space-x-8'
                          aria-label='Tabs'
                        >
                          {tabs.map((tab) => (
                            <button
                              key={tab.name}
                              onClick={() => setCurrentTab(tab.id)}
                              className={classNames(
                                tab.id === currentTab
                                  ? 'border-nlc-400 text-nlc'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                            >
                              {tab.name}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div>
                    {currentTab === 0 ? (
                      <div>tes 1</div>
                    ) : currentTab === 1 ? (
                      <div>tes 2</div>
                    ) : currentTab === 2 ? (
                      <div>tes 3</div>
                    ) : null}
                  </div>
                </div>
                {/* END OF PETUNJUK */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
