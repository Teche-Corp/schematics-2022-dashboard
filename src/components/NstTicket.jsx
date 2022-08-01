import React, { useRef } from 'react';
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from 'react-component-export-image';

const ComponentToPrint = React.forwardRef((props, ref, data) => {
  console.log(data);
  return (
    <>
      <div
        className='flex justify-center md:flex-row bg-white flex-col-reverse font-primary p-10 md:p-16 mx-auto w-10/12 md:w-2/3 rounded-xl'
        ref={ref}
      >
        {/* Name */}
        <div>
          <div className='relative w-full'>
            <p className='text-gray-300 '>Name</p>
            <p className='font-bold mb-4 text-xl md:text-2xl'>
              {props.data.name}
            </p>

            <p className='text-gray-300 '>Date &amp; Time</p>
            <p className='font-bold mb-4  text-xl md:text-2xl'>
              {'21 Dec 2021 / 07.00 PM'}
            </p>

            <p className='text-gray-300 '>Ticket</p>
            <p className='font-bold mb-4  text-xl md:text-2xl'>
              {props.jumlahTicket}
            </p>

            <p className='text-gray-300 '>Location</p>
            <p className='font-bold mb-4  text-xl md:text-2xl'>
              {'Gedung Research Center ITS'}
            </p>
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/images/nst/assetApproved.svg`}
            alt=''
            className='md:mx-auto rotate-90 w-14 md:w-48'
          />

          {/* Barcode Mobile */}
          <img
            className='w-64 mx-auto block md:hidden'
            src={`${process.env.PUBLIC_URL}/images/nst/barcode.png`}
            alt='qris'
          />
        </div>

        <div className='flex flex-col w-full md:w-2/4'>
          {/* Barcode Desktop */}
          <img
            className='w-64 mx-auto hidden md:block'
            src={`${process.env.PUBLIC_URL}/images/nst/barcode.png`}
            alt='qris'
          />

          <div className='flex justify-center items-center flex-col'>
            {/* Schemtics text */}
            <img
              src={`${process.env.PUBLIC_URL}/images/nst/schematics-text.png`}
              alt='schematics text'
              className='md:w-2/3 mb-3 mt-3'
            />
            {/* NST Ticket */}
            <img
              src={`${process.env.PUBLIC_URL}/images/nst/nst-text.svg`}
              alt='schematics text'
              className='w-32 md:w-72 mb-3'
            />

            {/* 2022 Text */}
            <img
              src={`${process.env.PUBLIC_URL}/images/nst/2022-text.png`}
              alt='2022 NST Text'
              className='mb-3 w-44 md:w-80'
            />
          </div>
        </div>
      </div>
    </>
  );
});
export default function NstTicket({ data = {}, jumlahTicket }) {
  const componentRef = useRef();

  return (
    <>
      <ComponentToPrint
        data={data}
        ref={componentRef}
        jumlahTicket={jumlahTicket}
      />
      <div className='my-6 flex justify-center items-center font-primary text-white '>
        <button
          className=' bg-blue-600 px-10 py-3 rounded-3xl text-xl hover:bg-white hover:text-blue-600'
          onClick={() =>
            exportComponentAsJPEG(componentRef, {
              fileName: `Tiket ${data.name}`,
            })
          }
        >
          Unduh Tiket
        </button>
      </div>
    </>
  );
}
