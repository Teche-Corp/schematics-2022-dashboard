import React from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function DashboardEventCard({ name, icon, status, link }) {
  return (
    <>
      <div className='md:w-1/5 flex flex-col min-h-[215px] bg-white rounded-xl relative shadow-lg '>
        <div className='flex justify-between'>
          {/* Logo */}
          <div className='-translate-y-1/2 ml-3'>
            <img src={icon} alt={name} />
          </div>
          <Link to={link}>
            <p className='text-right font-secondary font-light my-4 mx-5 text-base'>
              Daftar Sekarang &gt;
            </p>
          </Link>
        </div>
        <div className='m-auto font-semibold font-secondary md:text-xl text-base'>
          <p>{name}</p>
        </div>
        <div className=''>
          <div className='h-[1] border'></div>
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
