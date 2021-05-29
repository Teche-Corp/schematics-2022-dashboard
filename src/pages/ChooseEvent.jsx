import { Link } from 'react-router-dom';

import AuthHeader from '@/components/AuthHeader';

export default function ChooseEvent() {
  return (
    <>
      <div className='flex flex-col justify-center min-h-screen px-10 py-12 bg-dark lg:px-8'>
        <AuthHeader headerText='Choose the event!' />
        <div className='flex flex-col w-full mt-8 space-y-4 lg:mt-20 lg:space-y-0 lg:space-x-8 lg:flex-row sm:max-w-md md:max-w-none lg:justify-center'>
          <Link
            to='/dashboard'
            className='px-4 py-8 transition transform border-2 border-gray-600 shadow-lg group sm:px-10 hover:shadow-xl hover:scale-105 rounded-xl'
          >
            <h4 className='text-xl font-bold text-center transition transform text-nlc-100 group-hover:scale-105'>
              Schematics NLC
            </h4>
          </Link>
          <Link
            to='/dashboard'
            className='px-4 py-8 transition transform border-2 border-gray-600 shadow-lg group sm:px-10 hover:shadow-xl hover:scale-105 rounded-xl'
          >
            <h4 className='text-xl font-bold text-center transition transform text-npc-100 group-hover:scale-105'>
              Schematics NPC
            </h4>
          </Link>
          <Link
            to='/dashboard'
            className='px-4 py-8 transition transform border-2 border-gray-600 shadow-lg group sm:px-10 hover:shadow-xl hover:scale-105 rounded-xl'
          >
            <h4 className='text-xl font-bold text-center transition transform text-nst-100 group-hover:scale-105'>
              Schematics NST
            </h4>
          </Link>
          <Link
            to='/dashboard'
            className='px-4 py-8 transition transform border-2 border-gray-600 shadow-lg group sm:px-10 hover:shadow-xl hover:scale-105 rounded-xl'
          >
            <h4 className='text-xl font-bold text-center transition transform text-reeva-100 group-hover:scale-105'>
              Schematics REEVA
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
}
