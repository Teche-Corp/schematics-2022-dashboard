import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import { HiOutlineArrowCircleLeft } from 'react-icons/hi';

import { useAuthState } from '@/contexts/AuthContext';
import useLoadingToast from '@/hooks/useLoadingToast';

import DashboardShell from '@/layout/DashboardShell';
import DragnDropInput from '@/components/DragnDropInput';
import LightInput from '@/components/LightInput';
import SelectInput from '@/components/SelectInput';

import { classNames, bearerToken } from '@/lib/helper';

export default function PaymentNPC() {
  const { user } = useAuthState();
  const isLoading = useLoadingToast();

  const [currentTab, setCurrentTab] = useState(0);
  const [total, setTotal] = useState('Rp100.000');

  const history = useHistory();

  const methods = useForm();
  const { control, handleSubmit } = methods;

  // const { handleSubmit: handleSubmit2, register } = useForm();

  const paymentMethod = [
    { text: 'QRIS', value: 0 },
    { text: 'Mandiri', value: 1 },
  ];

  const usedMethod = useWatch({
    control,
    name: 'payment-method',
  });

  useEffect(() => {
    if (usedMethod === '0') {
      setTotal('Rp101.000');
    } else if (usedMethod === '1') {
      setTotal('Rp100.000');
    }
  }, [usedMethod]);

  const handleTabChange = (e) => {
    setCurrentTab(parseInt(e.target.value));
  };

  // const handleAddVoucher = (data) => {
  //   console.log(data);
  // };

  const handleUpload = async (data) => {
    const formData = new FormData();

    const newBody = {
      team_id: user.team[0].npc,
      jumlah: data['payment-method'] === '0' ? 101000 : 100000,
      sumber: data['payment-method'] === '0' ? 'QRIS' : 'Mandiri',
      kode_voucher: '',
      img: data['payment-receipt'][0],
    };

    for (const key in newBody) {
      formData.append(key, newBody[key]);
    }

    toast.promise(
      axios
        .post('/pembayaran/bukti/insert', formData, {
          headers: {
            ...bearerToken(),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          history.push('/my/sch-npc/team');
        }),
      {
        loading: 'Loading...',
        success: 'Bukti pembayaran berhasil diupload!',
        error: (err) => err.response.data.msg,
      },
    );
  };

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-5xl mx-auto md:px-8 xl:px-0'>
          <div className='px-4 pt-10 pb-16 sm:px-6 md:px-0'>
            <div className='flex items-center mb-6'>
              <Link to='/my/sch-npc/team'>
                <HiOutlineArrowCircleLeft className='w-6 h-6' />
              </Link>
              <h1 className='ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                <span className='block xl:inline'>Pembayaran</span>{' '}
                <span className='block text-npc-400 xl:inline'>
                  Schematics NPC
                </span>
              </h1>
            </div>
            <div className='grid grid-cols-1 gap-8 mt-6 sm:grid-cols-6'>
              <div className='sm:col-span-2'>
                <h2 className='text-lg font-semibold'>Total</h2>
                {/* <p className='line-through'>Rp200.000</p> */}
                <h4 className='text-4xl font-bold'>{total}</h4>
                {/* <form
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
                    className='inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white border border-transparent rounded-md shadow-sm bg-npc-400 hover:bg-npc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Gunakan
                  </button>
                </form>
                <div className='mt-2'>
                  <span className='font-bold'>SCHEMATICS</span> digunakan
                </div> */}
              </div>

              <div className='sm:col-span-4'>
                {/* UPLOAD BUKTI */}
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(handleUpload)}>
                    <h2 className='text-lg font-semibold'>
                      Upload Bukti Pembayaran
                    </h2>
                    <div className='mt-2 space-y-4 sm:mt-4'>
                      <SelectInput
                        label='Metode Pembayaran'
                        id='payment-method'
                        placeholder='Pilih metode pembayaran'
                        options={paymentMethod}
                        validation={{
                          required: 'Metode Pembayaran tidak boleh kosong',
                        }}
                      />
                      <LightInput
                        label='Nomor Rekening'
                        id='account-id'
                        type='text'
                        validation={{
                          required: 'Nomor Rekening tidak boleh kosong',
                        }}
                      />
                      <DragnDropInput
                        label='Bukti Pembayaran'
                        id='payment-receipt'
                        accept='image/png, image/jpg, image/jpeg'
                        helperText='File dalam format jpg, png, atau jpeg'
                        maxFiles={1}
                        validation={{
                          required: 'Bukti Pembayaran tidak boleh kosong',
                        }}
                      />
                      <div className='flex justify-end'>
                        <button
                          type='submit'
                          disabled={isLoading}
                          className={classNames(
                            'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-npc-400 hover:bg-npc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-npc-700',
                            isLoading && 'filter brightness-90 cursor-wait',
                          )}
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
                        Pilih metode
                      </label>
                      <select
                        id='tabs'
                        name='tabs'
                        className='block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-dark-400 focus:border-dark-400 sm:text-sm'
                        onChange={handleTabChange}
                        value={currentTab}
                      >
                        {paymentMethod.map((tab) => (
                          <option key={tab.value} value={tab.value}>
                            {tab.text}
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
                          {paymentMethod.map((tab) => (
                            <button
                              key={tab.text}
                              onClick={() => setCurrentTab(tab.value)}
                              className={classNames(
                                tab.value === currentTab
                                  ? 'border-npc-700 text-npc-400'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm focus:outline-none',
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                            >
                              {tab.text}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div>
                    {currentTab === 0 ? (
                      <div className='space-y-4 divide-y divide-gray-200'>
                        <ol className='pt-3 pl-4 space-y-3 list-decimal list-outside'>
                          <li>
                            Peserta melakukan pembayaran sebesar{' '}
                            <strong>Rp 101.000</strong> ke QR Code QRIS di bawah
                            ini dengan atas nama <strong>Schematics ITS</strong>
                            <img
                              className='h-48'
                              src={`${process.env.PUBLIC_URL}/images/qris.jpg`}
                              alt='qris-code'
                            />
                          </li>
                          <li>Pastikan nominal yang dibayarkan sudah sesuai</li>
                          <li>
                            Setelah melakukan pembayaran, peserta dapat
                            mengunggah bukti pembayaran yang sah pada formulir
                            yang telah disediakan
                          </li>
                          <li>
                            Verifikasi pembayaran akan dilakukan selama 3 x 24
                            jam
                          </li>
                          <li>
                            Biaya admin atau biaya tambahan transaksi ditanggung
                            oleh peserta
                          </li>
                        </ol>
                        <ul className='pt-3 pl-4 italic list-disc list-outside'>
                          <li>
                            Biaya tambahan Rp 1.000 sebagai biaya admin QRIS
                          </li>
                          <li>
                            Jika mengalami kendala pembayaran, silakan{' '}
                            <a
                              href='https://liff.line.me/1645278921-kWRPP32q?accountId=schematics.its&openerPlatform=webview&openerKey=webview%3AunifiedSearch'
                              className='underline cursor-pointer text-npc-400'
                            >
                              klik disini
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : currentTab === 1 ? (
                      <div className='space-y-4 divide-y divide-gray-200'>
                        <ol className='pt-3 pl-4 space-y-3 list-decimal list-outside'>
                          <li>
                            Peserta melakukan pembayaran sebesar{' '}
                            <strong>Rp 100.000</strong> ke rekening{' '}
                            <strong>
                              Bank Mandiri 1020009828846 a.n RAFIQI RACHMAT
                            </strong>
                          </li>
                          <li>Pastikan nominal yang dibayarkan sudah sesuai</li>
                          <li>
                            Setelah melakukan pembayaran, peserta dapat
                            mengunggah bukti pembayaran yang sah pada formulir
                            yang telah disediakan
                          </li>
                          <li>
                            Verifikasi pembayaran akan dilakukan selama 3 x 24
                            jam
                          </li>
                          <li>
                            Biaya admin atau biaya tambahan transaksi ditanggung
                            oleh peserta
                          </li>
                        </ol>
                        <ul className='pt-3 pl-4 italic list-disc list-outside'>
                          <li>
                            Jika mengalami kendala pembayaran, silakan{' '}
                            <a
                              href='https://liff.line.me/1645278921-kWRPP32q?accountId=schematics.its&openerPlatform=webview&openerKey=webview%3AunifiedSearch'
                              className='underline cursor-pointer text-npc-400'
                            >
                              klik disini
                            </a>
                          </li>
                        </ul>
                      </div>
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