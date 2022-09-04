import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import NstTicket from '@/components/NstTicket';
import DashboardShell from '@/layout/DashboardShell';
import { useHistory, Redirect } from 'react-router-dom';
import Error500 from '../error/500';
import Loading from '@/components/Loading';

export default function TicketNST() {
  const history = useHistory();
  const { data: nstTickets, error } = useSWR('/my_nst', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });
  useEffect(() => {
    if (nstTickets) {
      if (
        nstTickets.data.status === 'awaiting_payment' ||
        nstTickets.data.status === 'need_revision'
      ) {
        history.push('/nst/payment');
      }
      if (nstTickets.data.status === 'awaiting_verification') {
        history.push('/nst');
      }
    }
  }, [nstTickets]);

  if (error) {
    if (error.response.status === 404) {
      return <Redirect to={'/nst/registration'} />;
    }
    return <Error500 />;
  }
  if (!nstTickets) return <Loading />;

  return (
    <>
      <DashboardShell>
        <div className='bg-dark-100 min-h-screen w-full mx-auto pb-2 py-12'>
          {/* Looping */}
          {nstTickets?.data?.tickets.map((ticket, index) => {
            return (
              <NstTicket
                key={index}
                data={ticket}
                jumlahTicket={nstTickets.data.tickets.length}
              />
            );
          })}
        </div>
      </DashboardShell>
    </>
  );
}
