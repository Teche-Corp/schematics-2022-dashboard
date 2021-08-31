import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { HiOutlineArrowCircleLeft } from 'react-icons/hi';

import { useTeamDispatch, useTeamState } from '@/contexts/TeamContext';

import useLoadingToast from '@/hooks/useLoadingToast';
import useTeamId from '@/hooks/useTeamId';
import useSWRLoadingToast from '@/hooks/useSWRLoadingToast';

import DashboardShell from '@/layout/DashboardShell';
import DragnDropInput from '@/components/DragnDropInput';
import LightInput from '@/components/LightInput';
import SelectInput from '@/components/SelectInput';
import UnstyledLink from '@/components/UnstyledLink';

import {
  classNames,
  bearerToken,
  numberToRupiah,
  calculateDiscount,
  defaultToastMessage,
} from '@/lib/helper';
import { getWithToken } from '@/lib/swr';
import InformationBlock from '@/components/InformationBlock';

const paymentMethod = [
  { text: 'QRIS', value: 0 },
  { text: 'Mandiri', value: 1 },
];
const priceVariants = {
  1: 100000,
  3: 285000,
  4: 380000,
  5: 450000,
  6: 540000,
};

export default function PaymentNLC() {
  const { nlc } = useTeamState();
  const teamDispatch = useTeamDispatch();
  const isLoading = useLoadingToast();

  const [currentTab, setCurrentTab] = useState(0);
  const hasCommunal = Boolean(nlc?.communal_voucher_created);

  const { data: communalVoucherData, error: errorCommunalVoucher } = useSWR(
    hasCommunal ? '/nlc/communal_voucher/using' : null,
    getWithToken,
  );

  useSWRLoadingToast(communalVoucherData, errorCommunalVoucher, {
    runCondition: hasCommunal,
    loading: 'Mengambil data voucher komunal',
    success: 'Data voucher berhasil diambil',
  });

  const history = useHistory();

  const methods = useForm({ defaultValues: { 'payment-method': '0' } });
  const { handleSubmit, watch } = methods;
  const voucherMethods = useForm({
    defaultValues: { mode: 'gunakan', jumlahTim: '3' },
  });
  const {
    handleSubmit: handleSubmitVoucher,
    register,
    watch: watchVoucher,
    setValue: setVoucherFormValue,
  } = voucherMethods;

  // Set jumlah tim to communal limit_jumlah
  useEffect(() => {
    if (communalVoucherData) {
      setVoucherFormValue('mode', 'komunal');
      setVoucherFormValue('jumlahTim', communalVoucherData?.data?.limit_jumlah);
    }
  }, [communalVoucherData, setVoucherFormValue]);

  const teamId = useTeamId('nlc');
  if (!teamId || nlc?.status_pembayaran !== null) {
    history.push('/my/sch-nlc/team');
  }

  const voucherIsApplied = useMemo(
    () => nlc?.voucher?.kode_voucher && nlc?.voucher?.potongan_persen,
    [nlc],
  );

  // KOMUNAL LOGIC
  const mode = watchVoucher('mode');
  const jumlahTim = watchVoucher('jumlahTim');
  const timConditional = mode === 'komunal' ? jumlahTim + '' : '1';

  const BASE_PRICE = priceVariants[timConditional];

  // PRICING LOGIC
  const usedMethod = watch('payment-method');
  const calculatedPrice = voucherIsApplied
    ? calculateDiscount(BASE_PRICE, nlc?.voucher?.potongan_persen)
    : BASE_PRICE;
  const finalPrice =
    usedMethod === '0' ? calculatedPrice + 1000 : calculatedPrice;
  const finalBasePrice = usedMethod === '0' ? BASE_PRICE + 1000 : BASE_PRICE;

  useEffect(() => {
    // set Tab according to method
    setCurrentTab(parseInt(usedMethod));
  }, [usedMethod]);

  const handleTabChange = (e) => {
    setCurrentTab(parseInt(e.target.value));
  };

  const handleAddVoucher = (data) => {
    if (mode === 'gunakan') {
      const body = {
        kode_voucher: data['voucher-code'],
        team_id: teamId,
      };

      toast.promise(
        axios
          .post('/pembayaran/apply_voucher', body, {
            headers: {
              ...bearerToken(),
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            teamDispatch('STORE_NLC', {
              ...nlc,
              voucher: { ...res?.data?.data },
            });
          }),
        {
          ...defaultToastMessage,
          success: 'Voucher berhasil digunakan!',
        },
      );
    } else if (mode === 'komunal') {
      const body = {
        jumlah_tim: parseInt(data.jumlahTim),
      };

      toast.promise(
        axios
          .post('/nlc/communal_voucher/create', body, {
            headers: {
              ...bearerToken(),
              'Content-Type': 'application/json',
            },
          })
          .then((_) => {
            // if success, mutate to true
            // so SWR can fetch communal data
            teamDispatch('STORE_NLC', {
              ...nlc,
              communal_voucher_created: true,
            });
          }),
        {
          ...defaultToastMessage,
          success: 'Voucher komunal berhasil dibuat!',
        },
      );
    }
  };

  const handleUpload = async (data) => {
    const formData = new FormData();

    const newBody = {
      team_id: teamId,
      jumlah: finalPrice,
      sumber: data['payment-method'] === '0' ? 'QRIS' : 'Mandiri',
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
          history.push('/my/sch-nlc/team');
        }),
      {
        ...defaultToastMessage,
        success: 'Bukti pembayaran berhasil diupload!',
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
              <Link to='/my/sch-nlc/team'>
                <HiOutlineArrowCircleLeft className='w-6 h-6' />
              </Link>
              <h1 className='ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>
                <span className='block xl:inline'>Pembayaran</span>{' '}
                <span className='block text-nlc xl:inline'>Schematics NLC</span>
              </h1>
            </div>
            <div className='grid grid-cols-1 gap-8 mt-6 sm:grid-cols-6'>
              <div className='sm:col-span-2'>
                <h2 className='text-lg font-semibold'>Total</h2>
                {voucherIsApplied && (
                  <p className='text-gray-600 line-through'>
                    {numberToRupiah(finalBasePrice)}
                  </p>
                )}
                <h4 className='text-4xl font-bold'>
                  {numberToRupiah(finalPrice)}
                </h4>

                {/*  */}
                <FormProvider {...voucherMethods}>
                  <form
                    className={classNames(
                      'mt-5',
                      (voucherIsApplied || hasCommunal) && 'hidden',
                    )}
                    onSubmit={handleSubmitVoucher(handleAddVoucher)}
                  >
                    <div className='w-full mt-1 space-y-1 sm:max-w-xs'>
                      <label>Pilihan Jenis Voucher</label>
                      <div className='space-x-2 text-sm text-gray-700'>
                        <input
                          {...register('mode', { required: true })}
                          id='radio1'
                          type='radio'
                          className='text-nlc'
                          value='gunakan'
                        />
                        <label
                          htmlFor='radio1'
                          className='inline-block align-middle'
                        >
                          Gunakan Voucher
                        </label>
                      </div>
                      <div className='space-x-2 text-sm text-gray-700'>
                        <input
                          {...register('mode', { required: true })}
                          id='radio2'
                          type='radio'
                          className='text-nlc'
                          value='komunal'
                        />
                        <label
                          htmlFor='radio2'
                          className='inline-block align-middle'
                        >
                          Buat Voucher Komunal
                        </label>
                      </div>
                    </div>
                    {mode === 'gunakan' ? (
                      <div className='gap-3 mt-8 sm:flex sm:items-center'>
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
                          disabled={isLoading}
                          className={classNames(
                            'inline-flex justify-center mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400',
                            isLoading && 'filter brightness-90 cursor-wait',
                          )}
                        >
                          Gunakan
                        </button>
                      </div>
                    ) : (
                      <>
                        {hasCommunal ? (
                          <p>hasCommunal</p>
                        ) : (
                          <div className='mt-8'>
                            <SelectInput
                              label='Jumlah Tim Komunal'
                              id='jumlahTim'
                              options={jumlahTimOptions}
                              validation={{
                                required: 'Jumlah Tim tidak boleh kosong',
                              }}
                            />
                            <button
                              type='submit'
                              disabled={isLoading}
                              className={classNames(
                                'inline-flex justify-center mt-2 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400',
                                isLoading && 'filter brightness-90 cursor-wait',
                              )}
                            >
                              Buat
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </form>
                </FormProvider>

                {voucherIsApplied && (
                  <>
                    <div className='px-4 py-2 mt-2 text-gray-700 bg-yellow-100 rounded shadow-sm'>
                      Voucher{' '}
                      <span className='font-bold text-gray-900'>
                        {nlc?.voucher?.kode_voucher}
                      </span>{' '}
                      digunakan
                    </div>
                    {nlc?.voucher?.kode_voucher?.includes('SCH-TEAM-NLC') && (
                      <InformationBlock containerClassNames='mt-4'>
                        <p>
                          Anda tetap <strong>WAJIB</strong> mengisi bukti
                          pembayaran menggunakan data yang <strong>sama</strong>{' '}
                          dengan <strong>pembuat</strong> komunal.
                        </p>
                      </InformationBlock>
                    )}
                  </>
                )}

                {communalVoucherData && (
                  <div className='mt-4'>
                    <h3 className='font-semibold'>Kode Voucher Komunal:</h3>
                    <div className='px-4 py-2 mt-2 text-sm font-bold text-gray-800 bg-yellow-100 rounded shadow-sm'>
                      {communalVoucherData.data.kode_voucher}
                    </div>
                    <p className='mt-2 text-sm text-gray-700'>
                      Voucher berlaku sampai{' '}
                      {communalVoucherData?.data?.tanggal_berakhir}.
                    </p>
                    <p className='mt-2 text-sm text-red-500'>
                      Voucher akan dapat digunakan setelah pembayaran
                      dikonfirmasi admin.
                    </p>
                  </div>
                )}
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
                            'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nlc-400',
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
                        selected={currentTab}
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
                                  ? 'border-nlc-400 text-nlc'
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
                            <strong>
                              {numberToRupiah(calculatedPrice + 1000)}
                            </strong>{' '}
                            ke QR Code QRIS di bawah ini dengan atas nama{' '}
                            <strong>Schematics ITS</strong>
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
                            <UnstyledLink
                              href='https://liff.line.me/1645278921-kWRPP32q?accountId=schematics.its&openerPlatform=webview&openerKey=webview%3AunifiedSearch'
                              className='underline cursor-pointer text-nlc'
                            >
                              klik disini
                            </UnstyledLink>
                          </li>
                        </ul>
                      </div>
                    ) : currentTab === 1 ? (
                      <div className='space-y-4 divide-y divide-gray-200'>
                        <ol className='pt-3 pl-4 space-y-3 list-decimal list-outside'>
                          <li>
                            Peserta melakukan pembayaran sebesar{' '}
                            <strong>{numberToRupiah(calculatedPrice)}</strong>{' '}
                            ke rekening{' '}
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
                            <UnstyledLink
                              href='https://liff.line.me/1645278921-kWRPP32q?accountId=schematics.its&openerPlatform=webview&openerKey=webview%3AunifiedSearch'
                              className='underline cursor-pointer text-nlc'
                            >
                              klik disini
                            </UnstyledLink>
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

const jumlahTimOptions = [
  { value: '3', text: '3' },
  { value: '4', text: '4' },
  { value: '5', text: '5' },
  { value: '6', text: '6' },
];
