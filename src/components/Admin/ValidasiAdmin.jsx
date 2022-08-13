import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

import { classNames } from '@/lib/helper';

export default function ValidasiAdmin({
  label,
  helperText = '',
  id,
  placeholder = '',
  readOnly = false,
  options = [],
  validation,
  disabled = false,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-normal text-white font-primary'
      >
        {label}
      </label>
      <div className='relative mt-1'>
        <div className='flex flex-row w-full gap-x-10'>
          <select
            {...register(id, validation)}
            name={id}
            id={id}
            disabled={disabled}
            className={classNames(
              readOnly || disabled === true ? 'bg-gray-100' : '',
              errors[id]
                ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                : 'focus:ring-dark-400 focus:border-dark-400',
              'block w-full border-gray-300 rounded-md shadow-sm  sm:text-sm`',
            )}
            aria-describedby={id}
          >
            <option value='' disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <button
            {...rest}
            className='bg-blue-600 w-1/3 rounded font-primary text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800'
            type='submit'
          >
            Update
          </button>
        </div>

        {errors[id] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText !== '' && (
          <p className='text-xs text-gray-500'>{helperText}</p>
        )}
        {errors[id] && (
          <span className='text-sm text-red-500'>{errors[id].message}</span>
        )}
      </div>
    </div>
  );
}
