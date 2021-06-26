/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { classNames } from '@/lib/helper';

export default function CenteredAccordion({
  dataAccordion,
  component: Component,
}) {
  return (
    <div className='py-4 mx-auto max-w-7xl sm:py-8 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto divide-y-2 divide-gray-200'>
        <dl className='space-y-6 divide-y divide-gray-200'>
          {dataAccordion.map((item) => (
            <Disclosure as='div' key={item.title} className='pt-6'>
              {({ open }) => (
                <>
                  <dt className='text-lg'>
                    <Disclosure.Button className='flex items-start justify-between w-full text-left text-gray-400'>
                      <h3 className='text-2xl font-bold text-gray-900'>
                        {item.title}
                      </h3>
                      <span className='flex items-center ml-6 h-7'>
                        <ChevronDownIcon
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
    </div>
  );
}
