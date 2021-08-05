import axios from 'axios';
import toast from 'react-hot-toast';

import { bearerToken, defaultToastMessage } from '@/lib/helper';

export default function ExportButton({ name, url }) {
  const handleClick = () => {
    toast.promise(
      axios
        .get(url, {
          headers: { ...bearerToken() },
          responseType: 'blob',
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name); //or any other extension
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }),
      {
        ...defaultToastMessage,
        success: 'File berhasil diunduh',
      },
    );
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none'
    >
      Export Excel
    </button>
  );
}
