import React from 'react';

export default function CloseReeva() {
  return (
    <div className='overflow-y-hidden relative'>
      <img
        src={`${process.env.PUBLIC_URL}/images/reeva/reeva-top-right.png`}
        alt='reeva-top-right'
        className='absolute right-0 top-0 w-3/12'
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/reeva/reeva-top-left.png`}
        alt='reeva-top-left'
        className='absolute left-0 top-0 w-3/12'
      />
      <div className='h-screen flex flex-col justify-center items-center md:pb-16 pb-0 bg-dark-400'>
        <div className='md:w-1/2 w-4/5 text-center'>
          <h1 className='text-5xl md:text-9xl text-white font-primary uppercase'>
            <span className='text-reeva'>Presale 1</span> Is Closed!!
          </h1>
        </div>
        <div className='md:w-1/2 w-4/5 mt-2 text-white font-primary text-center space-y-2'>
          <p className='md:text-5xl text-3xl uppercase py-12'>
            Presale 2 is coming soon
          </p>
        </div>
        <a
          href='/landing'
          type='button'
          className='w-72 h-12 rounded-md bg-reeva text-white'
        >
          <span className='w-full h-full flex justify-center items-center font-primary md:text-2xl text-lg'>
            Back
          </span>
        </a>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/images/reeva/reeva-bottom.png`}
        alt='reeva-bottom'
        className='absolute md:w-full -bottom-2'
      />
    </div>
  );
}
