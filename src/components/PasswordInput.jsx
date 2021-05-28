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
      <label htmlFor={id} className='block text-sm font-bold text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1 '>
        <input
          {...register(id, validation)}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          disabled={disabled}
          className={`block w-full border-gray-300 rounded-md shadow-sm   ${
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-indigo-500 focus:border-indigo-500'
          } sm:text-sm`}
          placeholder={placeholder}
          aria-describedby={id}
        />
        <buton
          onClick={togglePassword}
          className='absolute inset-y-0 right-0 flex items-center pr-3'
        >
          {showPassword ? (
            <HiEyeOff className='text-xl text-gray-600 cursor-pointer hover:text-gray-700' />
          ) : (
            <HiEye className='text-xl text-gray-600 cursor-pointer hover:text-gray-700' />
          )}
        </buton>
      </div>
      {errors[id] && (
        <span className='text-sm text-red-500'>{errors[id].message}</span>
      )}
    </div>
  );
}
