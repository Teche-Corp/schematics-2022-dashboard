import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HiCog,
  HiHome,
  HiQuestionMarkCircle,
  HiXCircle,
  HiDesktopComputer,
  HiSpeakerphone,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { classNames } from '@/lib/helper';

import { BiBrain } from 'react-icons/bi';

const navigation = [
  { name: 'Home', href: '#', icon: HiHome, current: true },
  {
    name: 'Schematics NPC',
    href: '#',
    icon: HiDesktopComputer,
    current: false,
  },
  { name: 'Schematics NLC', href: '#', icon: BiBrain, current: false },
  { name: 'Schematics NST', href: '#', icon: HiSpeakerphone, current: false },
  {
    name: 'Schematics Reeva',
    href: '#',
    icon: HiOutlineSparkles,
    current: false,
  },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: HiCog },
  { name: 'Help', href: '#', icon: HiQuestionMarkCircle },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 z-40 flex lg:hidden'
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-cyan-700'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <HiXCircle
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex items-center flex-shrink-0 px-4'>
                <img
                  className='h-20 mx-auto'
                  src='/images/logo/colored-title.png'
                  alt='colored-title'
                />
              </div>
              <nav
                className='flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-cyan-800'
                aria-label='Sidebar'
              >
                <div className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-cyan-800 text-white'
                          : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className='w-6 h-6 mr-4 text-cyan-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='pt-6 mt-6'>
                  <div className='px-2 space-y-1'>
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='flex items-center px-2 py-2 text-base font-medium rounded-md group text-cyan-100 hover:text-white hover:bg-cyan-600'
                      >
                        <item.icon
                          className='w-6 h-6 mr-4 text-cyan-200'
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden h-full lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-cyan-700'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img
                className='h-20'
                src='/images/logo/colored-title.png'
                alt='colored-title'
              />
            </div>
            <nav
              className='flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-cyan-800'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-cyan-800 text-white'
                        : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className='w-6 h-6 mr-4 text-cyan-200'
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='pt-6 mt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:text-white hover:bg-cyan-600'
                    >
                      <item.icon
                        className='w-6 h-6 mr-4 text-cyan-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
