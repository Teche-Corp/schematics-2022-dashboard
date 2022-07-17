import DashboardEventCard from '@/components/DashboardEventCard';
import DashboardShell from '@/layout/DashboardShell';
import React from 'react';

function Landing() {
  // const notification = [
  //   {
  //     message: 'Pembayaran anda ditolak, mohon upload lagi',
  //     type: 'danger',
  //   },
  //   {
  //     message: 'Pendaftaran anda telah diverifikasi',
  //     type: 'success',
  //   },
  //   {
  //     message: 'Segera persiapkan diri anda',
  //     type: 'warning',
  //   },
  // ];

  const cards = [
    {
      textpicture: `${process.env.PUBLIC_URL}/images/nlc/nlc-text.svg`,
      name: 'NATIONAL LOGIC COMPETITION',
      img1: `${process.env.PUBLIC_URL}/images/nlc/assetNLC1.svg`,
      img2: `${process.env.PUBLIC_URL}/images/nlc/assetNLC.svg`,
      status: 'Mengikuti',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/npc/npc-text.svg`,
      name: 'NATIONAL PROGAMMING COMPETITION',
      img1: `${process.env.PUBLIC_URL}/images/npc/assetNPC2.svg`,
      img2: `${process.env.PUBLIC_URL}/images/npc/assetNPC.svg`,
      status: 'Tidak Mengikuti',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/nst/nst-text.svg`,
      name: 'NATIONAL SEMINAR OF TECHNOLOGY',
      img1: `${process.env.PUBLIC_URL}/images/nst/assetNST2.svg`,
      img2: `${process.env.PUBLIC_URL}/images/nst/assetNST1.svg`,
      status: 'Mengikuti',
    },
    {
      textpicture: `${process.env.PUBLIC_URL}/images/reeva/reeva-text.svg`,
      name: 'REVOLUTIONARY ENTERTAIMENT AND EXPO WITH VARIOUS ARTS',
      img1: `${process.env.PUBLIC_URL}/images/reeva/assetreeva1.svg`,
      img2: `${process.env.PUBLIC_URL}/images/reeva/assetreeva.svg`,
      status: 'Mengikuti',
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
                  // status={card.status}
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
