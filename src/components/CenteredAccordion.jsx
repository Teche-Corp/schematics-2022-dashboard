import { Disclosure } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { classNames } from '@/lib/helper';

export default function CenteredAccordion({
  dataAccordion,
  component: Component,
  loading = false,
}) {
  return (
    <div className='divide-y-2 divide-gray-200 '>
      <dl className='space-y-3 divide-y divide-gray-200'>
        {dataAccordion.map((item) => (
          <Disclosure as='div' key={item.title} className='pt-3'>
            {({ open }) => (
              <>
                <dt className='text-lg'>
                  <Disclosure.Button
                    disabled={loading}
                    className={classNames(
                      'flex items-start justify-between w-full text-left text-gray-400 focus:outline-none',
                      loading && 'cursor-wait',
                    )}
                  >
                    <h3 className='text-lg font-bold text-gray-900'>
                      {item.title}
                    </h3>
                    <span className='flex items-center ml-6 h-7'>
                      <HiChevronDown
                        className={classNames(
                          open ? '-rotate-180' : 'rotate-0',
                          'h-6 w-6 transform',
                        )}
                        aria-hidden='true'
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as='dd' className='mt-2'>
                  <Component data={item} />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
