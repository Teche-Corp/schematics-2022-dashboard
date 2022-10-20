import { Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { HiXCircle, HiLogout, HiViewGrid } from 'react-icons/hi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsCircleFill } from 'react-icons/bs';
import { classNames } from '@/lib/helper';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import UnstyledLink from '@/components/UnstyledLink';
import { FaTrophy } from 'react-icons/fa';
import { useAuthDispatch } from '@/contexts/AuthContext';
import { useSWRConfig } from 'swr';
import { useHistory } from 'react-router-dom';

const navigation = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/landing',
    icon: HiViewGrid,
    current: false,
    dropdown: [],
  },
  {
    id: 'events',
    name: 'Events',
    href: '#',
    icon: FaTrophy,
    current: false,
    dropdown: [
      {
        id: 'npc',
        name: 'Schematics NPC',
        href: '/npc',
        current: false,
      },
      {
        id: 'nlc',
        name: 'Schematics NLC',
        href: '/nlc',
        color: 'text-nlc',
        current: false,
      },
      {
        id: 'nst',
        name: 'Schematics NST',
        href: '/nst',
        color: 'text-nst',
        current: false,
      },
      {
        id: 'reeva',
        name: 'Schematics Reeva',
        href: '/reeva',
        color: 'text-reeva',
        current: false,
      },
    ],
  },
  // {
  //   id: 'npc',
  //   name: 'Schematics NPC',
  //   href: '/npc',
  //   color: 'text-white',
  //   icon: BsCircleFill,
  //   current: false,
  // },
  // {
  //   name: 'Schematics NLC',
  //   href: '/nlc',
  //   color: 'text-white',
  //   icon: BsCircleFill,
  //   current: false,
  // },
  // {
  //   name: 'Schematics NST',
  //   href: '/nst',
  //   color: 'text-white',
  //   icon: BsCircleFill,
  //   current: false,
  // },
  // {
  //   name: 'Schematics Reeva',
  //   href: '/reeva',
  //   color: 'text-white',
  //   icon: BsCircleFill,
  //   current: false,
  // },
  // {
  //   name: 'Sign Out',
  //   href: '/logout',
  //   color: 'text-white',
  //   icon: HiLogout,
  //   current: false,
  // },
  // {
  //   name: 'Schematics Reeva',
  //   href: '/my/sch-reeva/ticket',
  //   color: 'text-reeva',
  //   icon: BsCircleFill,
  //   current: false,
  // },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const authDispatch = useAuthDispatch();
  const { cache } = useSWRConfig();
  // const teamDispatch = useTeamDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [selectEvent, setSelectEvent] = useState(false);
  const handleLogout = () => {
    authDispatch('LOGOUT');
    cache.clear();
    // teamDispatch('CLEAR');
    history.replace('/login');
  };
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
            <div
              className={classNames(
                'relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4',
                pathname === '/landing' ? 'bg-yellow-200' : 'bg-gray-900',
              )}
            >
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
                <UnstyledLink
                  openNewTab={false}
                  href='https://schematics.its.ac.id/'
                >
                  <img
                    className='h-20 mx-auto'
                    src={`${process.env.PUBLIC_URL}/images/logo/logo-dashboard-desktop.svg`}
                    alt='colored-title'
                  />
                </UnstyledLink>
              </div>
              <nav
                className='flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-dark-700'
                aria-label='Sidebar'
              >
                <div className='px-2 space-y-3'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.href === pathname
                          ? 'bg-white text-[#24657A]'
                          : `hover:bg-gray-200 text-white hover:text-[#24657A]`,
                        item.color ? `${item.color}` : 'text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.color ? `${item.color}` : 'text-[#24657A]',
                          'w-6 h-6 mr-4',
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                      {item.id === 'events' && (
                        <div className='absolute right-5'>
                          <RiArrowDropDownLine className='text-white w-8 relative hover:text-[#24657A] h-8' />
                        </div>
                      )}
                    </Link>
                  ))}
                  <hr />
                  <div className='flex items-center px-2 py-3 space-y-3 text-white font-bold hover:text-[#24657A] hover:bg-white rounded-lg cursor-pointer'>
                    <HiLogout className='mr-3 w-5 h-5' />
                    Sign Out
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
          <div
            className={classNames(
              `flex flex-col flex-grow pt-5 pb-4 overflow-y-auto`,
              pathname === '/landing'
                ? 'dashboard-color'
                : pathname === '/npc'
                ? 'dashboard-color-2'
                : pathname === '/nlc'
                ? 'dashboard-color-2'
                : pathname === '/nst'
                ? 'dashboard-color'
                : pathname === '/reeva'
                ? 'dashboard-color'
                : 'bg-white',
            )}
          >
            <div className='flex items-center justify-center flex-shrink-0 px-4 w-full'>
              <UnstyledLink
                openNewTab={false}
                href='https://schematics.its.ac.id/'
              >
                <img
                  className='h-24 mt-4'
                  src={`${process.env.PUBLIC_URL}/images/logo/logo-dashboard-desktop-1.svg`}
                  alt='colored-title'
                />
              </UnstyledLink>
            </div>
            <nav
              className='flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-gray-600'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-3'>
                {navigation.map((item) => (
                  <Menu as='div'>
                    <Menu.Button
                      className={classNames(
                        item.href === pathname
                          ? 'bg-white text-[#24657A]'
                          : `hover:bg-gray-200 text-white hover:text-[#24657A]`,
                        `group flex items-center text-sm font-semibold rounded-md w-full`,
                      )}
                    >
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.href === pathname
                            ? 'bg-white text-[#24657A]'
                            : `hover:bg-gray-200 text-white hover:text-[#24657A]`,
                          `group flex items-center px-2 py-2 text-sm font-semibold rounded-md w-full`,
                        )}
                      >
                        <item.icon
                          className={classNames('w-6 h-6 mr-4')}
                          aria-hidden='true'
                        />
                        {item.name}
                        {item.id === 'events' && (
                          <div className={classNames('ml-auto')}>
                            <RiArrowDropDownLine
                              className={classNames(
                                'w-6 h-6',
                                item.href === '#' ? '' : 'rotate-180',
                              )}
                            />
                          </div>
                        )}
                      </Link>
                    </Menu.Button>
                    <Menu.Items>
                      {item.dropdown.map((event) => (
                        <Link
                          key={event.name}
                          to={event.href}
                          aria-current={event.current ? 'page' : undefined}
                          className={classNames(
                            `group flex items-center my-2 px-4 py-2 text-sm font-semibold rounded-md w-full`,
                            event.color ? `text-${event.color}` : 'text-white',
                            event.href === pathname
                              ? 'bg-white text-[#24657A]'
                              : `hover:bg-gray-200 text-white hover:text-[#24657A]`,
                          )}
                        >
                          {event.name}
                        </Link>
                      ))}
                    </Menu.Items>
                  </Menu>
                ))}
                <hr />
                <div
                  className='flex items-center px-2 py-3 space-y-3 text-white font-bold hover:text-[#24657A] hover:bg-white rounded-lg cursor-pointer'
                  onClick={handleLogout}
                >
                  <HiLogout className='mr-3 w-5 h-5' />
                  Sign Out
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
