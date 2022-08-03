import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import ReevaTicket from '@/components/ReevaTicket';
import DashboardShell from '@/layout/DashboardShell';
import { useHistory, Redirect } from 'react-router-dom';
import Error500 from '../error/500';
import Loading from '@/components/Loading';

export default function TicketReeva() {
  const history = useHistory();
  const { data: reevaTickets, error } = useSWR('/my_reeva', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });
  useEffect(() => {
    // if (reevaTickets) {
    //   if (
    //     reevaTickets.data.status === 'awaiting_payment' ||
    //     reevaTickets.data.status === 'need_revision'
    //   ) {
    //     history.push('/reeva/payment');
    //   }
    //   if (
    //     reevaTickets.data.status === 'active' ||
    //     reevaTickets.data.status === 'awaiting_verification'
    //   ) {
    //     history.push('/reeva');
    //   }
    // }
  }, [reevaTickets]);

  if (error) {
    if (error.response.status === 404) {
      history.push('/reeva/registration');
    }
    return <Error500 />;
  }
  if (!reevaTickets && !error) return <Loading />;

  return (
    <>
      <DashboardShell>
        <div className='bg-dark-100 min-h-screen w-full mx-auto pb-2 py-12'>
          {/* Looping */}
          {reevaTickets?.data?.tickets.map((ticket, index) => {
            return (
              <ReevaTicket
                key={index}
                data={ticket}
                jumlahTicket={reevaTickets.data.tickets.length}
              />
            );
          })}
        </div>
      </DashboardShell>
    </>
  );
}
