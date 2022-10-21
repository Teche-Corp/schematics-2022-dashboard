import DashboardEventCard from '@/components/DashboardEventCard';
import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import React, { useEffect, useState } from 'react';

function Landing() {
  const { user, loading } = useAuthState();

  const cards = [
    {
      name: 'Schematics NPC',
      icon: `${process.env.PUBLIC_URL}/images/npc/npc-dashboard.png`,
      link: '/npc',
      key: 'npc',
    },
    {
      name: 'Schematics NLC',
      icon: `${process.env.PUBLIC_URL}/images/nlc/nlc-dashboard.png`,
      link: '/nlc',
      key: 'nlc',
    },
    {
      name: 'Schematics NST',
      icon: `${process.env.PUBLIC_URL}/images/nst/nst-dashboard.png`,
      link: '/nst',
      key: 'nst',
    },
    {
      name: 'Schematics REEVA',
      icon: `${process.env.PUBLIC_URL}/images/reeva/reeva-dashboard.png`,
      link: '/reeva',
      key: 'reeva',
    },
  ];

  return (
    <DashboardShell>
      <div className='min-h-screen bg-white py-8'>
        <div className='md:px-16 px-6'>
          <div className='mb-20'>
            <p className='text-[#24657A] font-secondary text-xl'>
              Dashboard Peserta
            </p>
          </div>
          <div className='flex md:flex-row flex-col flex-wrap w-full justify-between md:space-y-0 space-y-3 gap-x-6 gap-y-5'>
            {cards.map((card, index) => {
              return (
                <DashboardEventCard
                  key={index}
                  icon={card.icon}
                  name={card.name}
                  link={card.link}
                  status={
                    user?.events?.[card.key] ? 'Mengikuti' : 'Tidak Mengikuti'
                  }
                />
              );
            })}
          </div>
          <div className='w-full md:h-64 h-96 bg-white p-6 mt-20 rounded-xl relative shadow-md'>
            <div className='bg-black px-6 py-4 absolute rounded -top-4'>
              <p className='text-xl font-bold text-center md:text-left text-white'>
                Pemberitahuan
              </p>
            </div>
            {/* <div>
              <ul className='list-disc list-inside text-lg'>
                <li>Pembayaran lo kocak</li>
                <li>Pembayaran lo kocak</li>
                <li>Pembayaran lo kocak</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default Landing;
