import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiBell, HiChevronDown, HiMenuAlt1 } from 'react-icons/hi';
import { VscAccount } from 'react-icons/vsc';

export default function Navbar({ setSidebarOpen }) {
  return (
    <div className='relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none'>
      <button
        className='px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden'
        onClick={() => setSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <HiMenuAlt1 className='w-6 h-6' aria-hidden='true' />
      </button>
      {/* Search bar */}
      <div className='flex justify-between flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
        <div className='flex flex-1'></div>
        <div className='flex items-center ml-4 md:ml-6'>
          <button className='p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
            <span className='sr-only'>View notifications</span>
            <HiBell className='w-6 h-6' aria-hidden='true' />
          </button>

          {/* Profile dropdown */}
          <Menu as='div' className='relative ml-3'>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className='flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50'>
                    <VscAccount className='w-6 h-6' />
                    <span className='hidden ml-3 text-sm font-medium text-gray-700 lg:block'>
                      <span className='sr-only'>Open user menu for </span>Emilia
                      Birch
                    </span>
                    <HiChevronDown
                      className='flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    static
                    className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='a'
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='a'
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='a'
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
