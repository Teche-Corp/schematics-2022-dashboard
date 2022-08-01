import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import NstTicket from '@/components/NstTicket';

export default function TicketNST() {
  const { data: nstTickets, error } = useSWR('/my_nst', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {}, [nstTickets]);
  return (
    <>
      <div className='bg-dark-100 min-h-screen w-full mx-auto pb-2'>
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
    </>
  );
}
