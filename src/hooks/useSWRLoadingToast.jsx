import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useSWRLoadingToast(
  data,
  error,
  { condition = false, ...customMessages } = {},
) {
  const [toastId, setToastId] = useState(data ? 'done' : 'idle');

  const toastMessage = {
    loading: 'Loading...',
    success: 'Berhasil',
    error: error?.response?.data?.msg ?? 'Terjadi kesalahan, mohon coba lagi',
    ...customMessages,
  };

  useEffect(() => {
    // if toastId is done,
    // then it is not the first render or the data is already cached
    if (condition) return;
    if (toastId === 'done') return;

    if (error) {
      toast.error(toastMessage.error, { id: toastId });
      setToastId('done');
    } else if (data) {
      toast.success(toastMessage.success, { id: toastId });
      setToastId('done');
    } else {
      setToastId(toast.loading(toastMessage.loading));
    }

    return () => {
      toast.dismiss();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, condition]);
}
