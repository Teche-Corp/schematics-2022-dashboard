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
          ? 'cursor-not-allowed bg-light-400'
          : 'bg-light-100 hover:bg-light-700 ',
        'flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-100',
      )}
      type='submit'
      disabled={loading}
    >
      {loading ? <ImSpinner8 className='animate-spin' /> : children}
    </button>
  );
}
