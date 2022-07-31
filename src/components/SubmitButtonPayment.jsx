import { ImSpinner8 } from 'react-icons/im';
import { useState } from 'react';
import { classNames } from '@/lib/helper';

export default function SubmitButton({
  className,
  loading,
  children,
  ...rest
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        {...rest}
        style={{ minHeight: 44 }}
        className={classNames(
          className,
          loading
            ? 'cursor-not-allowed bg-light-400'
            : 'bg-light-100 hover:bg-light-700 ',
          'flex items-center justify-center w-full px-4 py-2 text-sm font-medium font-tertiary border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-100',
        )}
        type='button'
        disabled={loading}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {loading ? <ImSpinner8 className='animate-spin' /> : children}
      </button>

      {showModal && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
            <div className='relative md:w-auto my-6 mx-auto max-w-3xl w-10/12'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white '>
                {/*header*/}
                <div className='relative w-full p-4'>
                  <h3 className='text-3xl font-semibold items-center text-center'>
                    Konfirmasi
                  </h3>
                  <span
                    className='absolute right-5 top-1 text-xl font-bold cursor-pointer'
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </span>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className='relative p-10 flex-auto'>
                  <p className='my-2 text-slate-500 text-lg leading-relaxed text-center '>
                    Apakah Anda telah yakin dengan data yang Anda isikan?
                  </p>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-x-8'>
                  <button
                    className='bg-gray-300 text-gray-500 background-transparent font-bold uppercase w-1/3 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-md hover:bg-gray-500 hover:text-gray-300'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Belum
                  </button>
                  <button
                    className='bg-nst-orange text-white active:bg-emerald-600 font-bold uppercase text-sm w-1/3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-white hover:text-nst-orange'
                    type='submit'
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </>
  );
}
