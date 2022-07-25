import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import Input from '@/components/Input';

import { classNames } from '@/lib/helper';

export default function SelectInput({
  value,
  label,
  helperText = '',
  id,
  placeholder = '',
  readOnly = false,
  options = [],
  validation,
  disabled = false,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [formVal, setFormVal] = useState('');

  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-normal text-white font-primary'
      >
        {label}
      </label>
      <div className='relative mt-1'>
        <select
          {...register(id, validation)}
          onChange={(e) => setFormVal(e.target.value)}
          value={formVal}
          name={formVal != 'lainnya' ? '' : id}
          id={formVal != 'lainnya' ? '' : id}
          disabled={disabled}
          className={classNames(
            readOnly || disabled === true ? 'bg-gray-100' : '',
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-dark-400 focus:border-dark-400',
            'block w-full border-gray-300 rounded-md shadow-sm  sm:text-sm mb-3',
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

        {/* Inputan */}
        {/* Aktif kalo  variable active nilai true*/}
        {formVal === 'lainnya' && (
          <Input
            label={'Masukkan sumber informasi lainnya'}
            id={id}
            validation={{
              required: 'Sumber infor tidak boleh kosong',
              minLength: {
                value: 5,
                message: 'Sumber informasi setidaknya memiliki 5 karakter',
              },
              maxLength: {
                value: 128,
                message: 'Sumber informasi maksimal memiliki 128 karakter',
              },
            }}
          />
        )}

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
