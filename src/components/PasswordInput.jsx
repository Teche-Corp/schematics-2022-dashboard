import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function PasswordInput({
  label,
  placeholder = '',
  id,
  disabled = false,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className=''>
      <label htmlFor={id} className='block text-sm font-bold text-gray-50'>
        {label}
      </label>
      <div className='relative mt-1 '>
        <input
          {...register(id, validation)}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          disabled={disabled}
          className={`block w-full border-gray-600 bg-dark rounded-md shadow-sm   ${
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-light-100 focus:border-light-100'
          } sm:text-sm`}
          placeholder={placeholder}
          aria-describedby={id}
        />
        <button
          type='button'
          onClick={() => {
            togglePassword();
          }}
          className='absolute inset-y-0 right-0 flex items-center p-1 mr-3 rounded-lg focus:outline-none focus:ring focus:ring-white'
        >
          {showPassword ? (
            <HiEyeOff className='text-xl text-gray-400 cursor-pointer hover:text-gray-500' />
          ) : (
            <HiEye className='text-xl text-gray-400 cursor-pointer hover:text-gray-500' />
          )}
        </button>
      </div>
      {errors[id] && (
        <span className='text-sm text-red-500'>{errors[id].message}</span>
      )}
    </div>
  );
}
