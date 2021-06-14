import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { classNames } from '@/lib/helper';

export default function DragnDropInput({
  accept,
  id,
  label,
  helperText = '',
  maxFiles = 1,
  validation,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const files = watch(id);
  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(id, droppedFiles, { shouldValidate: true });
    },
    [setValue, id],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  return (
    <>
      <label className='block text-sm font-normal text-gray-700' htmlFor={id}>
        {label}
      </label>

      {files?.length >= maxFiles ? (
        <div className='grid grid-cols-3 gap-2 mt-1'>
          {files.map((file) => {
            return (
              <div key={file.name} className='aspect-w-3 aspect-h-2'>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className='object-cover rounded-lg shadow-lg '
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className='mt-1' {...getRootProps()}>
            <input {...register(id, validation)} id={id} {...getInputProps()} />
            <div
              className={classNames(
                'w-full p-2 bg-gray-100 border border-gray-300 border-dashed rounded cursor-pointer',
                errors[id]
                  ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                  : 'focus:ring-dark-400 focus:border-dark-400',
              )}
            >
              <p className='my-20 text-center text-gray-500'>
                Tarik dan letakkan file ke kotak ini atau klik untuk memilih
                file
              </p>

              {!!files?.length && (
                <div className='grid grid-cols-4 gap-1 mt-2'>
                  {files.map((file) => {
                    return (
                      <div key={file.name} className='aspect-w-3 aspect-h-2'>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className='object-cover rounded-lg shadow-lg '
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className='mt-1'>
            {helperText !== '' && (
              <p className='text-xs text-gray-500'>{helperText}</p>
            )}
            {errors[id] && (
              <p className='text-sm text-red-500'>{errors[id].message}</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
