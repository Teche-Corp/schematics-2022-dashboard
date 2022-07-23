import DashboardEventCard from '@/components/DashboardEventCard';
import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import React, { useEffect, useState } from 'react';

function Landing() {
  const { user, loading } = useAuthState();

  const cards = [
    {
      textpicture: `${process.env.PUBLIC_URL}/images/nlc/nlc-text.png`,
      name: 'NATIONAL LOGIC COMPETITION',
      img1: `${process.env.PUBLIC_URL}/images/nlc/assetNLC1.png`,
      img2: `${process.env.PUBLIC_URL}/images/nlc/assetNLC.png`,
      key: 'nlc',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/npc/npc-text.png`,
      name: 'NATIONAL PROGAMMING CONTEST',
      img1: `${process.env.PUBLIC_URL}/images/npc/assetNPC2.png`,
      img2: `${process.env.PUBLIC_URL}/images/npc/assetNPC.png`,
      key: 'npc',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/nst/nst-text.png`,
      name: 'NATIONAL SEMINAR OF TECHNOLOGY',
      img1: `${process.env.PUBLIC_URL}/images/nst/assetNST2.png`,
      img2: `${process.env.PUBLIC_URL}/images/nst/assetNST1.png`,
      key: 'nst',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/reeva/reeva-text.png`,
      name: 'REVOLUTIONARY ENTERTAIMENT AND EXPO WITH VARIOUS ARTS',
      img1: `${process.env.PUBLIC_URL}/images/reeva/assetreeva1.png`,
      img2: `${process.env.PUBLIC_URL}/images/reeva/assetreeva.png`,
      key: 'reeva',
    },
  ];

  return (
    <DashboardShell>
      <div className='bg-black min-h-screen py-8'>
        <div className='md:px-16 px-6'>
          <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-3'>
            {cards.map((card, index) => {
              return (
                <DashboardEventCard
                  key={index}
                  textpicture={card.textpicture}
                  name={card.name}
                  img1={card.img1}
                  img2={card.img2}
                  status={
                    user?.events?.[card.key] ? 'Mengikuti' : 'Tidak Mengikuti'
                  }
                />
              );
            })}
          </div>
          <div className='w-full md:h-64 h-96 bg-white p-6 mt-8 rounded-xl'>
            <p className='text-3xl font-bold text-center md:text-left'>
              Pemberitahuan
            </p>
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
