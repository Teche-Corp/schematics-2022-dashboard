import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

export default function ImageLightbox({ src, alt, ...rest }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!src) {
    return null;
  }

  const images = typeof src === 'string' ? [src] : [...src];

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='focus:outline-none'
      >
        <img src={src} alt={alt} {...rest} />
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
    </>
  );
}
