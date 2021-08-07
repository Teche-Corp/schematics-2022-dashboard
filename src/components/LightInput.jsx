import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

import { classNames } from '@/lib/helper';

export default function LightInput({
  label,
  placeholder = '',
  helperText = '',
  id,
  type = 'text',
  readOnly = false,
  disabled = false,
  validation,
  min = '',
  max = '',
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={classNames(
            readOnly || disabled === true ? 'bg-gray-100' : '',
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-dark-400 focus:border-dark-400',
            'block w-full border-gray-300 rounded-md shadow-sm  sm:text-sm`',
          )}
          placeholder={placeholder}
          aria-describedby={id}
          min={min}
          max={max}
        />

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
