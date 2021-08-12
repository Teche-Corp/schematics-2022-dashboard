import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { HiClipboardCheck, HiOutlineClock } from 'react-icons/hi';

import { useAuthState } from '@/contexts/AuthContext';
import { useTeamDispatch, useTeamState } from '@/contexts/TeamContext';

import DashboardShell from '@/layout/DashboardShell';
import VerticalTimeline from '@/components/VerticalTimeline';
import TicketDetail from '@/components/TicketDetail';

import { bearerToken, defaultToastMessage } from '@/lib/helper';

const dataTimeline = [
  {
    id: 1,
    target: 'Pendaftaran',
    date: '16 Agu - 22 Okt',
    datetime: '2021-10-22',
    icon: HiClipboardCheck,
    iconBackground: 'bg-gray-900',
  },
  {
    id: 2,
    target: 'Pelaksanaan',
    date: '23 Okt',
    datetime: '2021-10-23',
    icon: HiOutlineClock,
    iconBackground: 'bg-nst',
  },
];

export default function EventNST() {
  const { nst } = useTeamState();
  const dispatch = useTeamDispatch();

  const { user } = useAuthState();

  const teamLoaded = Boolean(nst);

  useEffect(() => {
    const loadTeam = async () => {
      toast.promise(
        axios
          .post(
            '/nst/detail-ticket',
            {},
            {
              headers: {
                ...bearerToken(),
              },
            },
          )
          .then((res) => {
            dispatch('STORE_NST', res.data.data);
          }),
        {
          ...defaultToastMessage,
          success: 'Tiket berhasil dimuat!',
        },
      );
    };

    if (user?.nst_ticket) {
      loadTeam();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTeam = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    created_at: nst?.created_at,
  };

  const handleCreateTicket = () => {
    toast.promise(
      axios
        .post(
          '/nst/create-ticket',
          {},
          {
            headers: {
              ...bearerToken(),
            },
          },
        )
        .then((res) => {
          dispatch('STORE_NST', res.data.data);
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil membuat tiket!',
      },
    );
  };

  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            {/* If in AuthContext has teamId, then show the team detail page, and show skeleton */}
            {!user?.nst_ticket ? (
              <div className='px-4 text-center sm:px-6 md:px-0'>
                <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Schematics</span>{' '}
                  <span className='block text-nst xl:inline'>NST</span>
                </h1>
                <p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                  Schematics NST bertujuan untuk membagikan pengetahuan dan
                  perkemabangan teknologi informasi terkini
                </p>
                <div className='max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
                  <div className='rounded-md shadow'>
                    <button
                      type='button'
                      onClick={handleCreateTicket}
                      className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-nst hover:bg-nst-400 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nst-400'
                    >
                      Buat Tiket
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <section className='px-4 space-y-10 sm:px-6 md:px-0'>
                  <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Timeline</span>{' '}
                    <span className='block text-nst xl:inline'>
                      Schematics NST
                    </span>
                  </h2>
                  <div className='flex justify-center'>
                    <VerticalTimeline data={dataTimeline} />
                  </div>
                </section>
                <section className='px-4 mt-10 space-y-10 sm:px-6 md:px-0'>
                  {/* <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                    <span className='block xl:inline'>Detail</span>{' '}
                    <span className='block text-nst xl:inline'>Tim</span>
                  </h2> */}
                  <div className='py-4 overflow-hidden bg-white sm:border sm:shadow sm:py-8 sm:px-6 lg:px-8 sm:rounded-lg'>
                    {/* if not loaded yet, then pass undefined */}
                    <TicketDetail data={teamLoaded ? dataTeam : undefined} />
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
