import React from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { BiCheckCircle } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function DashboardEventCard({ name, icon, status, link }) {
  return (
    <>
      <div className='w-full md:w-[22%] xl:w-[22%] flex flex-col min-h-[215px] bg-white rounded-xl relative shadow-lg border-2 '>
        <div className='flex justify-between'>
          {/* Logo */}
          <div className='-translate-y-1/2 ml-3'>
            <img src={icon} alt={name} />
          </div>
          {status === 'Mengikuti' ? (
            ''
          ) : (
            <Link to={link}>
              <div className='flex items-center mr-2 xl:mr-3 mt-3'>
                <p className='font-secondary font-normal text-xs xl:text-sm'>
                  Daftar Sekarang
                </p>
                <FiChevronRight />
              </div>
            </Link>
          )}
        </div>
        <div className='m-auto font-semibold font-secondary md:text-lg text-base'>
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
