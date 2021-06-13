import { ImSpinner8 } from 'react-icons/im';

import { classNames } from '@/lib/helper';

export default function SubmitButton({
  className,
  loading,
  children,
  ...rest
}) {
  return (
    <button
      {...rest}
      style={{ minHeight: 44 }}
      className={classNames(
        className,
        loading
          ? 'cursor-not-allowed bg-indigo-400'
          : 'bg-indigo-600 hover:bg-indigo-700 ',
        'flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white  border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      )}
      type='submit'
      disabled={loading}
    >
      {loading ? <ImSpinner8 className='animate-spin' /> : children}
    </button>
  );
}
