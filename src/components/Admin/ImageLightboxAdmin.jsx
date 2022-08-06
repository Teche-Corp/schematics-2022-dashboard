import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

export default function ImageLightbox({ src, alt, label, ...rest }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!src) {
    return null;
  }

  const images = typeof src === 'string' ? [src] : [...src];

  return (
    <>
      <label className='block text-sm font-bold text-gray-50 mt-2'>
        {label}
      </label>
      <div className='w-full mt-1'>
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          className='focus:outline-none'
        >
          <img
            src={src}
            alt={alt}
            {...rest}
            className='p-1 bg-white  rounded max-w-sm'
          />
        </button>
        {isOpen && (
          <Lightbox
            mainSrc={images[index]}
            nextSrc={images[(index + 1) % images.length]}
            prevSrc={images[(index + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setIndex(
                (prevIndex) => (prevIndex + images.length - 1) % images.length,
              )
            }
            onMoveNextRequest={() =>
              setIndex((prevIndex) => (index + 1) % images.length)
            }
          />
        )}
      </div>
    </>
  );
}
