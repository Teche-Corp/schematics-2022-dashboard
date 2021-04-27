import React from 'react';

const SignInHeader = () => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='w-auto h-12 mx-auto'
        src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
        alt='Workflow'
      />
      <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
        Sign in to your account
      </h2>
      <p className='mt-2 text-sm text-center text-gray-600 max-w'>
        Or
        {/* space */}
        <a
          href='/'
          className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
        >
          start your 14-day free trial
        </a>
      </p>
    </div>
  );
};

export default SignInHeader;
