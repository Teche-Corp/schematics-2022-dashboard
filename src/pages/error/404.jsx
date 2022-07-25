import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <main
        className='relative z-0 flex-1 pb-8 overflow-y-auto bg-dark'
        style={{ minHeight: '100vh' }}
      >
        <div className='absolute flex flex-col items-center justify-center w-full sm:flex-row top-1/2 -mt-44 sm:-mt-28'>
          <div className='relative w-full sm:w-1/2 h-60'>
            <img
              className='absolute left-0 right-0 block object-contain m-auto sm:left-auto h-52 sm:h-60'
              src={`${process.env.PUBLIC_URL}/images/error-icon.png`}
              alt='error-icon'
            />
          </div>
          <div className='relative w-full text-center text-white sm:text-left sm:w-1/2'>
            <h1 className='-mt-5 text-5xl font-semibold'>Page Not Found</h1>
            <p className='mt-3 text-lg'>You can go back to the homepage</p>
            <Link
              className='relative inline-block px-5 py-2 text-lg font-extrabold transition duration-200 bg-blue-600 mt-7 rounded-2xl hover:bg-blue-500'
              to='/landing'
            >
              Back To Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
