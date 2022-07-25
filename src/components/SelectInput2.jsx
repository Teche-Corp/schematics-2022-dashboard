import React, { useEffect, useState } from 'react';
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
  const [lainnya, setLainnya] = useState(undefined);
  const [optionsState, setOptionsState] = useState(options);

  useEffect(() => {
    if (lainnya) {
      setOptionsState((options) => {
        return options.map((option) => {
          return option.text === 'Lainnya'
            ? {
                text: option.text,
                value: lainnya,
              }
            : option;
        });
      });
    }
  }, [lainnya]);

  const handleOnChangeLainnya = (e) => {
    const { value } = e.target;
    setLainnya(value);
  };

  return (
    <>
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
            name={id}
            id={id}
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
            {optionsState.map((option) => (
              <option key={option.value} value={option.value}>
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
      <div>
        {formVal === 'lainnya' && (
          <div className=''>
            <label
              htmlFor={'lainnya'}
              className='block text-sm font-bold text-gray-50'
            >
              Masukkan asal informasi schematics
            </label>
            <div className='relative mt-1 '>
              <input
                {...register('lainnya', {
                  required: 'Sumber infor tidak boleh kosong',
                  minLength: {
                    value: 5,
                    message: 'Sumber informasi setidaknya memiliki 5 karakter',
                  },
                  maxLength: {
                    value: 128,
                    message: 'Sumber informasi maksimal memiliki 128 karakter',
                  },
                })}
                className={`block w-full p-2 border-gray-600 bg-white rounded-md shadow-sm   ${
                  errors[id]
                    ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                    : 'focus:ring-light-100 focus:border-light-100'
                } sm:text-sm`}
                onChange={handleOnChangeLainnya}
                name='lainnya'
                id='lainnya'
                disabled={false}
                aria-describedby='lainnya'
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
        )}
      </div>
    </>
  );
}
