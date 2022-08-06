import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function ImageFetch({ imgpath, tag, label, ...rest }) {
  const [imgSrc, setImgSrc] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const getImageUrl = (url) => {
    const imageFetcher = axios.create({
      // baseURL: (process.env.NODE_ENV === 'production' && process.env.PUBLIC_URL === '/dashboard') ? 'https://schematics.its.ac.id:8081/api' : 'https://deploy-laravel.herokuapp.com/api' ,
      baseURL: 'https://schematics.its.ac.id:8081/api',
    });
    imageFetcher
      .get(url, {
        headers: {
          ...bearerToken(),
        },
        responseType: 'arraybuffer',
      })
      .then((response) => {
        let base64string = btoa(
          String.fromCharCode(...new Uint8Array(response.data)),
        );
        let contentType = response.headers['content-type'];
        return {
          base64string,
          contentType,
        };
      })
      .then((res) => {
        let imgsrc = 'data:' + res.contentType + ';base64,' + res.base64string;
        setImgSrc(imgsrc);
      });
  };

  useEffect(() => {
    if (imgpath) {
      const imgUrl = `/stream_image?path=${imgpath}`;
      getImageUrl(imgUrl);
    }
  }, []);

  if (!imgpath) {
    return (
      <>
        <label className='mt-2 block text-sm font-bold text-gray-50'>
          {tag}
        </label>
        <div
          role='status'
          className='flex justify-center items-center max-w-sm h-56 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
        >
          <svg
            className='w-12 h-12 text-gray-200'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 640 512'
          >
            <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
          </svg>{' '}
          <span className='sr-only'>Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <label className='mt-2 block text-sm font-bold text-gray-50'>{tag}</label>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='focus:outline-none max-w-xs'
      >
        <img
          src={imgSrc}
          alt={tag}
          {...rest}
          className='p-1 bg-white border rounded max-w-sm'
        />
        {isOpen && (
          <Lightbox mainSrc={imgSrc} onCloseRequest={() => setIsOpen(false)} />
        )}
      </button>
    </>
  );
}
