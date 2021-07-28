import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

import { classNames } from '@/lib/helper';

export default function SelectInput({
  label,
  helperText = '',
  id,
  placeholder = '',
  readOnly = false,
  options = [],
  validation,
  disabled = false,
  defaultValue = undefined,
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
          defaultValue={defaultValue}
        >
          <option value='' disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={defaultValue === option.value}
            >
              {option.text}
            </option>
          ))}
        </select>

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
