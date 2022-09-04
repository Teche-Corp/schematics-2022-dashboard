import { Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import {
  HiCog,
  HiQuestionMarkCircle,
  HiXCircle,
  HiDesktopComputer,
  HiSpeakerphone,
  HiOutlineSparkles,
} from 'react-icons/hi';

import { classNames } from '@/lib/helper';
import { BiBrain } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

import UnstyledLink from '@/components/UnstyledLink';

const navigation = [
  // { name: 'Home', href: '/my', icon: HiHome, current: false },
  {
    name: 'Schematics NPC',
    href: '#',
    dropdown: [
      // Go to Table
      {
        name: 'Verifikasi Team NPC Junior',
        href: '/admin/sch-npc-junior',
      },
      {
        name: 'Verifikasi Team NPC Senior',
        href: '/admin/sch-npc-senior',
      },
      {
        name: 'Verifikasi Payment NPC Junior',
        href: '/admin/sch-npc-junior-payment',
      },
      {
        name: 'Verifikasi Payment NPC Senior',
        href: '/admin/sch-npc-senior-payment',
      },
    ],
    color: 'text-npc',
    icon: HiDesktopComputer,
    current: false,
  },
  {
    name: 'Schematics NLC',
    dropdown: [
      {
        name: 'Verifikasi Team NLC',
        href: '/admin/sch-nlc',
      },
      {
        name: 'Verifikasi Payment NLC',
        href: '/admin/sch-nlc-payment',
      },
    ],
    color: 'text-nlc',
    icon: BiBrain,
    current: false,
  },
  {
    name: 'Schematics NST',
    href: '/admin/sch-nst/',
    color: 'text-nst',
    dropdown: [
      {
        name: 'Verifikasi Payment NST',
        href: '/admin/sch-nst/',
      },
    ],
    icon: HiSpeakerphone,
    current: false,
  },
  {
    name: 'Schematics Reeva',
    dropdown: [
      {
        name: 'Verifikasi Payment Reeva',
        href: '/admin/sch-reeva/',
      },
    ],
    color: 'text-reeva',
    icon: HiOutlineSparkles,
    current: false,
  },
  // {
  //   name: 'Keuangan Total',
  //   href: '/admin/earning',
  //   icon: HiCurrencyDollar,
  //   current: false,
  // },
  // {
  //   name: 'Voucher',
  //   href: '/admin/voucher',
  //   icon: HiOutlineReceiptRefund,
  //   current: false,
  // },
  // {
  //   name: 'Schemastore',
  //   href: '/admin/schemastore',
  //   icon: HiCreditCard,
  //   current: false,
  // },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: HiCog },
  { name: 'Help', href: '#', icon: HiQuestionMarkCircle },
];

export default function AdminSibebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const { pathname } = location;

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
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white'>
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
                <div className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <Menu as='div'>
                      <Menu.Button
                        className={classNames(
                          item.href === pathname
                            ? 'bg-dark-100'
                            : 'hover:bg-dark-400',
                          item.color ? `${item.color}` : 'text-white',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        )}
                      >
                        {item.name}
                      </Menu.Button>
                      <Menu.Items>
                        {item.dropdown.map((link) => (
                          <Menu.Item>
                            <Link
                              to={link.href}
                              className='text-npc'
                              aria-current={item.current ? 'page' : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  item.color ? `${item.color}` : 'text-white',
                                  'w-6 h-6 mr-4 text-white',
                                )}
                                aria-hidden='true'
                              />
                              {link.name}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Menu>

                    // <Link
                    //   key={item.name}
                    //   to={item.href}
                    //   className={classNames(
                    //     item.href === pathname
                    //       ? 'bg-dark-100'
                    //       : 'hover:bg-dark-400',
                    //     item.color ? `${item.color}` : 'text-white',
                    //     'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    //   )}
                    //   aria-current={item.current ? 'page' : undefined}
                    // >
                    //   <item.icon
                    //     className={classNames(
                    //       item.color ? `${item.color}` : 'text-white',
                    //       'w-6 h-6 mr-4 text-white',
                    //     )}
                    //     aria-hidden='true'
                    //   />
                    //   {item.name}
                    // </Link>
                    // )
                  ))}
                </div>
                <div className='pt-6 mt-6'>
                  <div className='px-2 space-y-1'>
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className='flex items-center px-2 py-2 text-base font-medium text-white rounded-md group hover:bg-dark-400'
                      >
                        <item.icon
                          className='w-6 h-6 mr-4 text-white'
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
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
          <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <UnstyledLink
                openNewTab={false}
                href='https://schematics.its.ac.id/'
              >
                <img
                  className='h-20'
                  src={`${process.env.PUBLIC_URL}/images/logo/logo-dashboard-desktop.svg`}
                  alt='colored-title'
                />
              </UnstyledLink>
            </div>
            <nav
              className='flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-gray-600'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <Menu as='div'>
                    <Menu.Button
                      className={classNames(
                        item.href === pathname
                          ? 'bg-dark-100'
                          : 'hover:bg-dark-400',
                        item.color ? `${item.color}` : 'text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md w-full',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.color ? `${item.color}` : 'text-white',
                          'w-6 h-6 mr-4 text-white',
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Menu.Button>
                    <Menu.Items className='bg-white rounded-xl p-4 flex flex-col'>
                      {item.dropdown.map((link) => (
                        <Menu.Item>
                          <Link
                            to={link.href}
                            className={classNames(
                              'flex items-center px-2 py-1 hover:bg-gray-100 rounded-md',
                              `${item.color}`,
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {/* <link.icon
                              className={classNames(
                                item.color ? `${item.color}` : 'text-white',
                                'w-3 h-3 mr-4 text-white',
                              )}
                              aria-hidden='true'
                            /> */}
                            {link.name}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                  //   <Link
                  //     key={item.name}
                  //     to={item.href}
                  //     className={classNames(
                  //       item.href === pathname
                  //         ? 'bg-dark-100'
                  //         : 'hover:bg-dark-400',
                  //       item.color ? `${item.color}` : 'text-white',
                  //       'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  //     )}
                  //     aria-current={item.current ? 'page' : undefined}
                  //   >
                  //     <item.icon
                  //       className={classNames(
                  //         item.color ? `${item.color}` : 'text-white',
                  //         'w-6 h-6 mr-4 text-white',
                  //       )}
                  //       aria-hidden='true'
                  //     />
                  //     {item.name}
                  //   </Link>
                  // );
                ))}
              </div>
              <div className='pt-6 mt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className='flex items-center px-2 py-2 text-base font-medium text-white bg-dark-100 rounded-md group hover:bg-dark-400'
                    >
                      <item.icon
                        className='w-6 h-6 mr-4 text-white'
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
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
