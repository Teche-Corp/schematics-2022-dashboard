import { classNames } from '@/lib/helper';

export default function HorizontalTimeline({ data = [] }) {
  const width = data.length === 5 ? 'sm:w-1/5' : '';

  return (
    <div className='flow-root'>
      <ul className='-mb-8 sm:flex sm:flex-row sm:mb-0'>
        {data.map((event, eventIdx) => (
          <li key={event.id} className={classNames(width)}>
            <div className='relative pb-8 sm:pb-0'>
              {eventIdx !== data.length - 1 ? (
                <span
                  className='absolute top-4 left-4 sm:ml-20 sm:w-full sm:h-0.5 bg-gray-200  -ml-px h-full w-0.5'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex space-x-3 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-3'>
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
                <div className='min-w-0 flex-1 sm:flex-col flex items-center sm:justify-center sm:space-x-0 sm:space-y-0.5   pt-1.5 sm:pt-0  justify-between space-x-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-900 sm:leading-4 sm:text-center'>
                      {event.target}
                    </p>
                  </div>
                  <div className='text-sm text-right text-gray-500 sm:text-left whitespace-nowrap'>
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
