import { classNames } from '@/lib/helper';
import {
  HiDesktopComputer,
  HiSpeakerphone,
  HiOutlineSparkles,
} from 'react-icons/hi';

import { BiBrain } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const actions = [
  {
    title: 'Schematics NLC',
    href: '/my/sch-nlc/team',
    icon: BiBrain,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-nlc-100',
    description:
      'Schematics NLC merupakan kompetisi logika terbesar di Indonesia, dengan jumlah peserta yang kerap meningkat tiap tahunnya',
  },
  {
    title: 'Schematics NPC',
    href: '/my/sch-npc/team',
    icon: HiDesktopComputer,
    iconForeground: 'text-npc',
    iconBackground: 'bg-npc-100',
    description:
      'Schematics NPC merupakan sebuah kompetisi pemrograman tingkat nasional yang menguji kemampuan algoritma dan pemrograman dalam memecahkan masalah yang diberikan',
  },
  {
    title: 'Schematics NST',
    href: '/my/sch-nst/ticket',
    icon: HiSpeakerphone,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-nst-100',
    description:
      'Schematics NST bertujuan untuk membagikan pengetahuan dan perkemabangan teknologi informasi terkini',
  },
  {
    title: 'Schematics Reeva',
    href: '#',
    icon: HiOutlineSparkles,
    iconForeground: 'text-blue-700',
    iconBackground: 'bg-reeva-100',
    description:
      'Schematics REEVA merupakan penutup dari serangkaian event Schematics yang menghadirkan expo berisi jutaan kreativitas dan berbagai performance menarik dari artis - artis ternama Indonesia.',
  },
];

export default function MainCard() {
  return (
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
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-white',
              )}
            >
              <action.icon className='w-6 h-6' aria-hidden='true' />
            </span>
          </div>
          <div className='mt-8'>
            <h3 className='text-lg font-medium'>
              <Link to={action.href} className='focus:outline-none'>
                {/* Extend touch target to entire panel */}
                <span className='absolute inset-0' aria-hidden='true' />
                {action.title}
              </Link>
            </h3>
            <p className='mt-2 text-sm text-gray-500'>{action.description}</p>
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
  );
}
