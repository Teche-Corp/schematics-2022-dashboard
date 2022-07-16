import React from 'react';

function DashboardEventCard({ textpicture, name, img1, img2, status }) {
  return (
    <>
      <div className='md:w-1/5 w-full h-[360px] py-6 bg-white rounded-xl relative'>
        <img src={textpicture} alt='text-nlc' className='mx-auto' />
        <p className='mt-1 text-center font-semibold px-4'>{name}</p>
        <div className='w-full h-52 relative pt-4'>
          <img src={img1} alt='assetnlc1' className='absolute left-0' />
          <img src={img2} alt='assetnlc2' className='absolute right-0' />
        </div>
        <p
          className={`px-4 font-bold absolute bottom-6 ${
            status === 'Mengikuti' ? 'text-blue-600' : 'text-red-500'
          }`}
        >
          <span className='text-xl text-black'>Status:</span> {status}
        </p>
      </div>
    </>
  );
}

export default DashboardEventCard;
