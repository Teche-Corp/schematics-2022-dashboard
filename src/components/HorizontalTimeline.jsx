import { classNames } from '@/lib/helper';

export default function HorizontalTimeline({ data = [] }) {
  return (
    <div className='flow-root'>
      <ul className='flex flex-row -mb-8'>
        {data.map((event, eventIdx) => (
          <li key={event.id} className={`w-1/${data.length}`}>
            <div className='relative'>
              {eventIdx !== data.length - 1 ? (
                <span
                  className='absolute top-4 left-4 ml-20 w-full h-0.5 bg-gray-200'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex flex-col items-center space-y-3'>
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                    )}
                  >
                    <event.icon
                      className='w-5 h-5 text-white'
                      aria-hidden='true'
                    />
                  </span>
                </div>
                <div className='min-w-0 flex-1 flex-col flex items-center justify-center space-y-0.5'>
                  <div>
                    <p className='text-sm font-medium leading-4 text-center text-gray-900'>
                      {event.target}
                    </p>
                  </div>
                  <div className='text-sm text-gray-500 whitespace-nowrap'>
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
