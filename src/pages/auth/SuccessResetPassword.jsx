import React from 'react';
import { Link } from 'react-router-dom';

export const SuccessResetPassword = () => {
  return (
    <div className='w-full min-h-screen bg-dark-400 flex justify-center items-center'>
      <div className='py-24 px-12 border border-white rounded-lg'>
        <p className='py-2 md:text-3xl text-xl font-primary text-center w-full text-white mb-4'>
          Berhasil merubah password akun anda
        </p>
        <Link to={'/login'}>
          <button className='w-full h-full bg-white hover:bg-gray-200 rounded-lg flex justify-center items-center'>
            <p className='text-xl font-bold py-4 px-2'>Login</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
