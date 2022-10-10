import React from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function DashboardEventCard({ name, icon, status, link }) {
  return (
    <>
      <div className=' py-5 min-w-[220px] flex flex-col min-h-[215px] bg-white rounded-xl relative shadow'>
        {/* Logo */}
        <div className='absolute -top-6 left-5'>
          <img src={icon} alt={name} />
        </div>
        <Link to={link}>
          <p className='text-right font-secondary font-light p-4 text-base'>
            Daftar Sekarang &gt;
          </p>
        </Link>
        <div className='m-auto font-semibold font-secondary md:text-xl text-base'>
          <p>{name}</p>
        </div>
        <div className=''>
          <div className='h-[1] border brde'></div>
          <div className={`flex px-2 items-center gap-x-2 my-2`}>
            {/* Icons */}
            {status === 'Mengikuti' ? (
              <BiCheckCircle className={`text-xl text-green-500`} />
            ) : (
              <MdOutlineWarningAmber className={`text-xl text-red-500`} />
            )}
            {status}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardEventCard;
