export default function Error500() {
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
            <h1 className='-mt-5 text-5xl font-semibold'>Under Maintenance</h1>
            <p className='mt-3 text-lg'>Please check again later</p>
          </div>
        </div>
      </main>
    </>
  );
}
