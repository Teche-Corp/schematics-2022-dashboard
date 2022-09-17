import React, { useEffect, useRef, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { QRCodeCanvas } from 'qrcode.react';
import Loading from './Loading';
const ComponentToPrint = React.forwardRef((props, ref, data) => {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(false);
  }, [isLoad]);

  if (!props || isLoad) {
    <Loading />;
  }
  return (
    <>
      <div
        className='flex justify-center md:flex-row bg-white flex-col-reverse font-primary p-10 md:p-16 mx-auto w-10/12 md:w-2/3 rounded-xl gap-x-4'
        ref={ref}
      >
        {/* Name */}
        <div className='relative h-max'>
          <div className=''>
            <div className='relative w-full z-10'>
              <p className='text-gray-300 '>Name</p>
              <p className='font-bold mb-4 text-base md:text-2xl'>
                {props?.data.name}
              </p>

              <p className='text-gray-300 '>Date &amp; Time</p>
              <p className='font-bold mb-4 text-base md:text-2xl'>
                {'12 November 2022'}
              </p>

              <p className='text-gray-300 '>Ticket</p>
              <p className='font-bold mb-4  text-base md:text-2xl'>
                {props.jumlahTicket}
              </p>

              <p className='text-gray-300 '>Location</p>
              <p className='font-bold mb-4  text-base md:text-2xl'>
                {'Jatim Expo Surabaya'}
              </p>
            </div>

            <img
              src={`${process.env.PUBLIC_URL}/images/approved.png`}
              alt=''
              className='absolute md:relative right-0 top-0 md:inset-px w-20 z-0'
            />
          </div>

          {/* Barcode Mobile */}
          {/* ticket_id */}
          <QRCodeCanvas
            className=' mx-auto block md:hidden mt-4'
            size={160}
            value={props?.data.ticket_id}
          />

          {/* <img
            className='w-64 mx-auto block md:hidden'
            src={`${process.env.PUBLIC_URL}/images/nst/barcode.png`}
            alt='qris'
          /> */}
        </div>

        <div className='flex flex-col w-full md:w-2/4 items-center gap-x-2'>
          {/* Barcode Desktop */}
          <QRCodeCanvas
            className=' mx-auto hidden md:block'
            size={200}
            value={props?.data.ticket_id}
          />
          {/* <img
            className='w-64 mx-auto hidden md:block'
            src={`${process.env.PUBLIC_URL}/images/nst/barcode.png`}
            alt='qris'
          /> */}

          <div className='flex justify-center items-center flex-col pt-4'>
            {/* Schemtics text */}
            <img
              src={`${process.env.PUBLIC_URL}/images/reeva/reeva.png`}
              alt='schematics text'
              className=' mb:w-22 mb-3 md:mt-3 mt-1'
            />
          </div>
        </div>
      </div>
    </>
  );
});
export default function ReevaTicket({ data = {}, jumlahTicket }) {
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
              html2CanvasOptions: {
                html2CanvasOptions: {
                  // scrollY: -window.scrollY,
                  // scrollX: window.scrollX,
                  scale: 3,

                  useCORS: true,
                  imageTimeout: 1000,
                },
              },
            })
          }
        >
          Unduh Tiket
        </button>
      </div>
    </>
  );
}
