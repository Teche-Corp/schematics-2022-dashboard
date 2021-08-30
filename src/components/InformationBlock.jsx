import { classNames } from '@/lib/helper';
import { HiInformationCircle } from 'react-icons/hi';

export default function InformationBlock({ containerClassNames, children }) {
  return (
    <div
      className={classNames('p-4 rounded-md bg-blue-50', containerClassNames)}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          <HiInformationCircle
            className='w-5 h-5 text-blue-400'
            aria-hidden='true'
          />
        </div>
        <div className='ml-2 text-sm text-blue-700'>{children}</div>
      </div>
    </div>
  );
}
