import { Link } from 'react-router-dom';

export default function Error500() {
  return (
    <>
      <main
        className='relative z-0 flex-1 bg-dark pb-8 overflow-y-auto'
        style={{ minHeight: '100vh' }}
      >
        <div className='absolute flex flex-col sm:flex-row justify-center items-center w-full top-1/2 -mt-44 sm:-mt-28'>
          <div className='w-full sm:w-1/2 h-60 relative'>
            <img
              className='block m-auto absolute left-0 sm:left-auto right-0 object-contain h-52 sm:h-60'
              src='/images/error-icon.png'
              alt='error-icon'
            />
          </div>
          <div className='text-center sm:text-left w-full sm:w-1/2 text-white relative'>
            <h1 className='-mt-5 font-semibold text-5xl'>Error 500</h1>
            <p className='mt-3 text-lg'>
              Sorry something went wrong.
              <br />
              come back to previous page
            </p>
            <Link
              className='relative inline-block transition duration-200 bg-blue-600 mt-7 text-lg rounded-2xl font-extrabold hover:bg-blue-500 py-2 px-5'
              to='/my'
            >
              Back To Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
