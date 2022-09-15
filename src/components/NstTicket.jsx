import React, { useEffect, useRef, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import Loading from './Loading';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

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
        className='flex justify-center md:flex-row bg-white flex-col-reverse font-primary p-10 md:p-16 mx-auto w-10/12 md:w-2/3 rounded-xl'
        ref={ref}
      >
        {/* Name */}
        <div className='relative'>
          <div className='relative w-full z-10'>
            <p className='text-gray-300 '>Name</p>
            <p className='font-bold mb-4 text-base sm:text-lg md:text-2xl'>
              {props.data.name}
            </p>

            <p className='text-gray-300 '>Date &amp; Time</p>
            <p className='font-bold mb-4  text-base sm:text-lg md:text-2xl'>
              {'22 Oktober 2022'}
            </p>

            <p className='text-gray-300 '>Ticket</p>
            <p className='font-bold mb-4  text-base sm:text-lg md:text-2xl'>
              {props.jumlahTicket}
            </p>

            <p className='text-gray-300 '>Location</p>
            <p className='font-bold mb-4  text-base sm:text-lg md:text-2xl'>
              {'SCC Marvell City Surabaya'}
            </p>
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/images/approved.png`}
            alt=''
            className='absolute md:relative right-0 top-0 md:inset-px w-20 z-0'
          />

          {/* Barcode Mobile */}
          {/* <img
            className='w-64 mx-auto block md:hidden'
            src={`${process.env.PUBLIC_URL}/images/nst/barcode.png`}
            alt='qris'
          /> */}
          <div className='p-2'>
            <QRCodeCanvas
              className='mx-auto block md:hidden mt-4'
              size={160}
              level={'H'}
              value={props?.data.ticket_id}
            />
          </div>
        </div>

        <div className='flex flex-col w-full'>
          {/* Barcode Desktop */}
          <QRCodeCanvas
            className=' mx-auto hidden md:block w-96 z-50'
            size={200}
            level={'H'}
            value={props?.data.ticket_id}
          />

          <div className='flex justify-center items-center flex-col'>
            {/* Schemtics text */}
            <img
              src={`${process.env.PUBLIC_URL}/images/nst/nst.png`}
              alt='schematics text'
              className='md:w-22 mb-3 mt-4'
            />
          </div>
        </div>
      </div>
    </>
  );
});
export default function NstTicket({ data = {}, jumlahTicket }) {
  const componentRef = useRef();
  const options = { x: -1, y: 20 };
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
                // scrollY: -window.scrollY,
                // scrollX: window.scrollX,
                scale: 3,

                useCORS: true,
                imageTimeout: 1000,
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
