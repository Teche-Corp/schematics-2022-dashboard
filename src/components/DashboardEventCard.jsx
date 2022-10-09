import React from 'react';

function DashboardEventCard({ textpicture, name, img1, img2, status }) {
  return (
    <>
      <div className='w-full min-h-26 py-6 bg-white rounded-xl relative'>
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
