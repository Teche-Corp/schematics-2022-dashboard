import { classNames } from '@/lib/helper';

export default function HorizontalTimeline({ data = [] }) {
  return (
    <div className='flow-root w-full'>
      <ul className='flex flex-row -mb-8'>
        {data.map((event, eventIdx) => (
          <li key={event.id}>
            <div className='relative pb-8'>
              {eventIdx !== data.length - 1 ? (
                <span
                  className='absolute top-4 left-4 -ml-px w-full h-0.5 bg-gray-200'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex flex-col items-center space-x-6'>
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex flex-col items-center justify-center ring-8 ring-white',
                    )}
                  >
                    <event.icon
                      className='w-5 h-5 text-white'
                      aria-hidden='true'
                    />
                  </span>
                </div>
                <div className='flex flex-col justify-between flex-1 min-w-0 space-x-8'>
                  <div>
                    <h3 className='mt-0'>
                      <a href={event.href} className='font-bold text-gray-900'>
                        {event.target}
                      </a>
                    </h3>
                    <p className='text-sm text-gray-500'>{event.content}</p>
                  </div>
                  <div className='text-sm text-right text-gray-500 whitespace-nowrap'>
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
