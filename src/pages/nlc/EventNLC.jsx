import useSWR from 'swr';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import localeID from 'date-fns/locale/id';

import {
  HiClipboardCheck,
  HiFire,
  HiUserGroup,
  HiUsers,
  HiUser,
} from 'react-icons/hi';

import { useTeamDispatch, useTeamState } from '@/contexts/TeamContext';

import useTeamId from '@/hooks/useTeamId';
import useSWRLoadingToast from '@/hooks/useSWRLoadingToast';

import DashboardShell from '@/layout/DashboardShell';
import CenteredAccordion from '@/components/CenteredAccordion';
import HorizontalTimeline from '@/components/HorizontalTimeline';
import TeamDetail from '@/components/TeamDetail';
import TeamMemberDetail from '@/components/TeamMemberDetail';
import InformationBlock from '@/components/InformationBlock';

import { bearerToken, classNames } from '@/lib/helper';
import { getWithToken } from '@/lib/swr';
import { DEADLINE_NLC } from '@/lib/constants';

const dataTimeline = [
  {
    id: 1,
    target: 'Pendaftaran',
    date: '03 Jul - 25 Sep',
    datetime: '2021-09-25',
    icon: HiClipboardCheck,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 2,
    target: 'Warm Up',
    date: '02 Okt - 03 Okt',
    datetime: '2021-10-03',
    icon: HiFire,
    iconBackground: 'bg-nlc',
  },
  {
    id: 3,
    target: 'Penyisihan',
    date: '09 Okt',
    datetime: '2021-10-09',
    icon: HiUserGroup,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 4,
    target: 'Perdelapan  - Perempat Final',
    date: '16 Okt',
    datetime: '2021-10-16',
    icon: HiUsers,
    iconBackground: 'bg-nlc',
  },
  {
    id: 5,
    target: 'Semi Final - Final - Awarding Night',
    date: '17 Okt',
    datetime: '2021-10-17',
    icon: HiUser,
    iconBackground: 'bg-gray-900',
  },
];

export default function EventNLC() {
  const { nlc } = useTeamState();
  const dispatch = useTeamDispatch();

  const teamId = useTeamId('nlc');
  const ketua = nlc?.anggota.find((anggotaEl) => anggotaEl.role === 'ketua');
  const anggota = nlc?.anggota.find(
    (anggotaEl) => anggotaEl.role === 'anggota',
  );

  const teamLoaded = Boolean(nlc);

  const deadline = new Date(DEADLINE_NLC);

  const hasCommunal = Boolean(nlc?.communal_voucher_created);
  const { data: communalVoucherData, error: errorCommunalVoucher } = useSWR(
    hasCommunal ? '/nlc/communal_voucher/using' : null,
    getWithToken,
  );

  let voucherExpireTime;
  if (hasCommunal) {
    voucherExpireTime = new Date(communalVoucherData?.data?.tanggal_berakhir);
    voucherExpireTime.setHours(voucherExpireTime.getHours() + 7);
  }

  useSWRLoadingToast(communalVoucherData, errorCommunalVoucher, {
    runCondition: hasCommunal,
    loading: 'Mengambil data voucher komunal',
    success: 'Data voucher berhasil diambil',
  });

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await axios.post(
          '/nlc/team/find',
          { team_id: teamId },
          {
            headers: { ...bearerToken() },
          },
        );

        dispatch('STORE_NLC', res.data.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.response.data);
        toast.error('Gagal mengambil data tim!');
      }
    };

    if (teamId) {
      loadTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTeam = {
    name: nlc?.nama_tim,
    school: nlc?.asal_sekolah,
    region: nlc?.region,
    city: nlc?.kota,
    province: nlc?.provinsi,
    password: `schnlc${ketua?.nama}`,
    payment:
      nlc?.status_pembayaran === null
        ? 'not_paid'
        : nlc?.status_pembayaran === false
        ? 'waiting'
        : 'paid',
    phase: nlc?.tahapan ?? '-',
  };

  // Cek belum bayar, jika di production, cek deadline juga
  let showPaymentButton;
  if (process.env.PUBLIC_URL === '/dashboard') {
    if (
      new Date() < deadline.setHours(deadline.getHours + 3) &&
      nlc?.status_pembayaran === null
    )
      showPaymentButton = true;
  } else if (nlc?.status_pembayaran === null) {
    showPaymentButton = true;
  } else {
    showPaymentButton = false;
  }

  const dataTeamMember = [
    {
      title: 'Ketua Tim',
      name: ketua?.nama,
      email: ketua?.email,
      nisn: ketua?.nisn,
      phone: ketua?.nomor_telepon,
      line: ketua?.id_line,
      address: ketua?.alamat,
      attachment: [
        {
          name: 'Surat Keterangan Aktif',
          link: ketua?.link_bukti_sah,
        },
      ],
    },
    ...(anggota?.nama
      ? [
          {
            title: 'Anggota 1',
            name: anggota?.nama,
            email: anggota?.email,
            nisn: anggota?.nisn,
            phone: anggota?.nomor_telepon,
            line: anggota?.id_line,
            address: anggota?.alamat,
            attachment: [
              {
                name: 'Surat Keterangan Aktif',
                link: anggota?.link_bukti_sah,
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            {/* If in AuthContext has teamId, then show the team detail page, and show skeleton */}
            {!teamId ? (
              <div className='px-4 text-center sm:px-6 md:px-0'>
                <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Schematics</span>{' '}
                  <span className='block text-nlc xl:inline'>NLC</span>
                </h1>
                <p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                  Schematics NLC merupakan kompetisi logika terbesar di
                  Indonesia, dengan jumlah peserta yang kerap meningkat tiap
                  tahunnya
                </p>
                {process.env.PUBLIC_URL === '/dashboard' &&
                  new Date() < deadline && (
                    <div className='max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                      <div className='rounded-md shadow'>
                        <Link
                          to='/my/sch-nlc/team/create'
                          className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400 md:py-4 md:text-lg md:px-10'
                        >
                          Buat Tim
                        </Link>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <>
                <section className='px-4 space-y-10 sm:px-6 md:px-0'>
                  <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Timeline</span>{' '}
                    <span className='block text-nlc xl:inline'>
                      Schematics NLC
                    </span>
                  </h2>
                  <div className=''>
                    <HorizontalTimeline data={dataTimeline} />
                  </div>
                </section>
                <section className='px-4 mt-10 space-y-10 sm:px-6 md:px-0'>
                  <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Detail</span>{' '}
                    <span className='block text-nlc xl:inline'>Tim</span>
                  </h2>
                  <div className='py-4 overflow-hidden bg-white sm:border sm:shadow sm:py-8 sm:px-6 lg:px-8 sm:rounded-lg'>
                    {/* if not loaded yet, then pass undefined */}
                    <TeamDetail
                      data={teamLoaded ? dataTeam : undefined}
                      event='nlc'
                    />
                    <CenteredAccordion
                      loading={!teamLoaded}
                      dataAccordion={dataTeamMember}
                      component={TeamMemberDetail}
                    />
                    {showPaymentButton && (
                      <div className='mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                        <div className='rounded-md shadow'>
                          {/* passing undefined so link won't be clickable */}
                          <Link
                            to={teamLoaded ? '/my/sch-nlc/payment' : '#'}
                            className={classNames(
                              'flex items-center justify-center px-4 py-2 font-medium text-white border border-transparent rounded-md shadow-sm bg-nlc hover:bg-nlc-400',
                              !teamLoaded && 'filter brightness-75 cursor-wait',
                            )}
                          >
                            Lakukan Pembayaran
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* DETAIL VOUCHER KOMUNAL */}
                {hasCommunal && (
                  <section className='px-4 mt-10 space-y-10 sm:px-6 md:px-0'>
                    <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                      <span className='block xl:inline'>Detail</span>{' '}
                      <span className='block text-nlc xl:inline'>
                        Voucher Komunal
                      </span>
                    </h2>
                    {communalVoucherData && (
                      <div className='py-4 overflow-hidden bg-white sm:border sm:shadow sm:py-8 sm:px-6 lg:px-8 sm:rounded-lg'>
                        <div className='mt-4'>
                          <h3 className='font-semibold'>
                            Kode Voucher Komunal:
                          </h3>
                          <div className='inline-block px-4 py-2 mt-2 text-sm font-bold text-gray-800 bg-yellow-100 rounded shadow-sm'>
                            {communalVoucherData?.data?.kode_voucher}
                          </div>
                          <p className='mt-2 text-sm text-gray-700'>
                            Voucher berlaku sampai{' '}
                            {format(
                              voucherExpireTime,
                              'dd MMMM yyyy HH:mm:ss',
                              {
                                locale: localeID,
                              },
                            )}
                            .
                          </p>
                          {dataTeam?.payment !== 'paid' && (
                            <p className='mt-2 text-sm text-red-500'>
                              Voucher akan dapat digunakan setelah pembayaran
                              dikonfirmasi admin.
                            </p>
                          )}
                        </div>
                        <p className='mt-6 font-semibold'>
                          <span className='p-1 bg-yellow-100 rounded'>
                            {communalVoucherData?.data?.teams_using?.length ??
                              0}{' '}
                            / {communalVoucherData?.data?.limit_jumlah ?? 0}
                          </span>{' '}
                          Tim menggunakan:
                        </p>
                        <ol className='mt-2 space-y-2 list-decimal list-inside'>
                          {communalVoucherData?.data?.teams_using?.map(
                            ({ team_id, team_name }) => (
                              <li key={team_id}>{team_name}</li>
                            ),
                          )}
                        </ol>
                        <InformationBlock containerClassNames='mt-4'>
                          <p>
                            Tim komunal lain yang menggunakan voucher,{' '}
                            <strong>WAJIB</strong> mengisi bukti pembayaran
                            menggunakan data yang sama dengan pembuat voucher.
                          </p>
                        </InformationBlock>
                      </div>
                    )}
                  </section>
                )}
                {/* DETAIL VOUCHER KOMUNAL END */}
              </>
            )}
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
