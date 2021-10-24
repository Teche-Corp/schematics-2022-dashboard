import Countdown from 'react-countdown';

import { HiOutlineClock } from 'react-icons/hi';

import DashboardShell from '@/layout/DashboardShell';
import VerticalTimeline from '@/components/VerticalTimeline';

const dataTimeline = [
  {
    id: 2,
    target: 'Pelaksanaan',
    date: '30 Okt (18.30 WIB)',
    datetime: '2021-10-30',
    icon: HiOutlineClock,
    iconBackground: 'bg-reeva',
  },
];

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <div>LINK YOUTUBE COMING SOON</div>;
  } else {
    return (
      <div class='grid grid-flow-col gap-8 text-center auto-cols-max'>
        <div class='flex flex-col'>
          <span class='text-7xl font-medium'>
            {days.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
          days
        </div>
        <div class='flex flex-col'>
          <span class='text-7xl font-medium'>
            {hours.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
          hours
        </div>
        <div class='flex flex-col'>
          <span class='text-7xl font-medium'>
            {minutes.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
          min
        </div>
        <div class='flex flex-col'>
          <span class='text-7xl font-medium'>
            {seconds.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
          sec
        </div>
      </div>
    );
  }
};

export default function EventReeva() {
  return (
    <DashboardShell>
      <main
        className='flex-1 overflow-y-auto bg-white border-t focus:outline-none'
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            <>
              <section className='px-4 space-y-10 sm:px-6 md:px-0'>
                <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl'>
                  <span className='block xl:inline'>Informasi</span>{' '}
                  <span className='block text-reeva xl:inline'>
                    Schematics REEVA
                  </span>
                </h2>
              </section>
              <section className='flex justify-center mt-10'>
                <VerticalTimeline data={dataTimeline} />
              </section>
              <section className='flex justify-center px-4 mt-10 space-y-10 sm:px-6 md:px-0'>
                <Countdown
                  date={new Date(2021, 9, 30, 18, 30, 0)}
                  renderer={renderer}
                />
              </section>
            </>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
