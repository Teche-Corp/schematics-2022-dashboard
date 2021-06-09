import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export default function StandAloneInput({
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
    <>
      <div className='relative w-full'>
        <input
          {...register(id, validation)}
          type={type}
          name={id}
          id={id}
          disabled={disabled}
          className={`block w-full border-gray-300 rounded-md shadow-sm   ${
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-dark-400 focus:border-dark-400'
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
        <span className='mt-2 text-sm text-red-500'>{errors[id].message}</span>
      )}
    </>
  );
}
