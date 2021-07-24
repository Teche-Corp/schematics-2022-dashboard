import DashboardAdminShell from '@/layout/DashboardAdminShell';

import { classNames } from '@/lib/helper';
import { HiDesktopComputer } from 'react-icons/hi';

import { BiBrain } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const actions = [
  {
    title: 'Schematics NPC Senior',
    href: '/admin/event/sch-npc/senior/user',
    icon: BiBrain,
    iconForeground: 'text-npc',
    iconBackground: 'bg-npc-100',
  },
  {
    title: 'Schematics NPC Junior',
    href: '/admin/event/sch-npc/junior/user',
    icon: HiDesktopComputer,
    iconForeground: 'text-npc',
    iconBackground: 'bg-npc-100',
  },
];

export default function AdminNpc() {
  return (
    <DashboardAdminShell>
      <section className='max-w-sm py-10 mx-auto md:max-w-2xl'>
        <h1 className='py-5 text-3xl font-bold text-center'>
          Menu Admin <span className='text-npc'>Schematics NPC</span>{' '}
        </h1>
        <div className='overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={classNames(
                actionIdx === 0
                  ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                  : '',
                actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                actionIdx === actions.length - 1
                  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                  : '',
                'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dark-100',
              )}
            >
              <div className='flex justify-center'>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg  inline-flex p-3 ring-4 ring-white',
                  )}
                >
                  <action.icon className='w-6 h-6' aria-hidden='true' />
                </span>
              </div>
              <div className='mt-8'>
                <h3 className='text-lg font-medium text-center'>
                  <Link to={action.href} className='focus:outline-none'>
                    {/* Extend touch target to entire panel */}
                    <span className='absolute inset-0' aria-hidden='true' />
                    {action.title}
                  </Link>
                </h3>
                <p className='mt-2 text-sm text-gray-500'>
                  {action.description}
                </p>
              </div>
              <span
                className='absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400'
                aria-hidden='true'
              >
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </section>
    </DashboardAdminShell>
  );
}
