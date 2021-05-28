import React from 'react';

const SignInHeader = ({ headerText }) => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='w-32 mx-auto'
        src='/images/logo/colored-no-title.png'
        alt='Logo Colored'
      />
      <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
        {headerText}
      </h2>
    </div>
  );
};

export default SignInHeader;
