import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export default function Input({
  label,
  placeholder = '',
  id,
  type = 'text',
  disabled = false,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className=''>
      <label htmlFor={id} className='block text-sm font-bold text-gray-50'>
        {label}
      </label>
      <div className='relative mt-1 '>
        <input
          {...register(id, validation)}
          type={type}
          name={id}
          id={id}
          disabled={disabled}
          className={`block w-full border-gray-600 bg-dark rounded-md shadow-sm   ${
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-indigo-500 focus:border-indigo-500'
          } sm:text-sm`}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {errors[id] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      {errors[id] && (
        <span className='text-sm text-red-500'>{errors[id].message}</span>
      )}
    </div>
  );
}
