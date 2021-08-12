import { classNames } from '@/lib/helper';

export default function VerticalTimeline({ data = [] }) {
  return (
    <div className='flow-root'>
      <ul className='-mb-8'>
        {data.map((event, eventIdx) => (
          <li key={event.id}>
            <div className='relative pb-8'>
              {eventIdx !== data.length - 1 ? (
                <span
                  className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex space-x-3'>
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
                <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                  <div>
                    <p className='text-sm text-gray-500'>{event.target}</p>
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
