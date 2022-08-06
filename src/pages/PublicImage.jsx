import ImageFetch from '@/components/ImageFetch';
import useQuery from '@/hooks/useQuery';
import React from 'react';

export default function PublicImage() {
  const query = useQuery();
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <ImageFetch imgpath={query.get('path')} tag='gambar' className='h-5/6' />
    </div>
  );
}
