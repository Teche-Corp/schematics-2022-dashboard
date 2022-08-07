import { useCallback, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { classNames } from '@/lib/helper';
import ImageFetch from './ImageFetch';

const FilePreview = ({ file, deleteFile }) => {
  console.log('fileValue ' + file);
  if (typeof file === 'string') {
    return (
      <>
        <li className='w-full h-full' key={file}>
          <div className='w-full h-full border p-0 m-0 border-gray-300 border-dashed rounded cursor-pointer focus:ring-dark-400 focus:border-dark-400'>
            <ImageFetch imgpath={file} tag={file} className='w-full h-full' />
          </div>
        </li>
      </>
    );
  }
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteFile(e, file);
  };

  return (
    <>
      <li className='w-full h-full' key={file.name}>
        <div
          className='w-full h-full border border-gray-300 border-dashed rounded cursor-pointer focus:ring-dark-400 focus:border-dark-400'
          style={{
            backgroundImage: `url(${URL.createObjectURL(file)})`,
            backgroundSize: 'cover',
          }}
          onClick={handleDelete}
        ></div>
      </li>
    </>
  );
};

export default function DragnDropInputBox({
  accept,
  id,
  label,
  helperText = '',
  maxFiles = 1,
  validation,
  defaultValue,
}) {
  console.log('component defaultValue ' + defaultValue);
  const {
    control,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const files = watch(id);
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, []);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        setValue(id, acceptedFiles, { shouldValidate: true });
        clearErrors(id);
      }
    },
    [id, setValue, setError, clearErrors],
  );

  const deleteFile = (e, file) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setValue(id, newFiles);
    } else {
      setValue(id, []);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 2000000,
  });

  return (
    <>
      <label
        className='block text-sm font-normal text-white font-primary'
        htmlFor={id}
      >
        {label}
      </label>

      {defaultValue !== undefined || files?.length >= maxFiles ? (
        <ul className='border h-64 border-gray-200 divide-y divide-gray-200 rounded-md'>
          {defaultValue ? (
            <FilePreview key={defaultValue} file={defaultValue} />
          ) : (
            files.map((file) => (
              <FilePreview key={file} file={file} deleteFile={deleteFile} />
            ))
          )}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={(controllerProps) => (
            <>
              <div className='mt-1' {...getRootProps()}>
                <input {...getInputProps()} />
                <div
                  className={classNames(
                    'w-full p-2 bg-gray-100 border border-gray-300 border-dashed rounded cursor-pointer h-64 flex justify-center items-center',
                    errors[id]
                      ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                      : 'focus:ring-dark-400 focus:border-dark-400',
                  )}
                >
                  <p className='text-center text-gray-500 font-primary'>
                    Tarik dan letakkan file ke kotak ini atau klik untuk memilih
                    file (maksimal 1 MB)
                  </p>
                </div>
              </div>

              <div className='mt-1'>
                {helperText !== '' && (
                  <p className='text-xs text-white font-primary'>
                    {helperText}
                  </p>
                )}
                {errors[id] && (
                  <p className='text-sm text-red-500'>{errors[id].message}</p>
                )}
              </div>
              {defaultValue !== undefined && !(files?.length >= maxFiles) && (
                <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
                  {defaultValue ? (
                    <FilePreview key={defaultValue} file={defaultValue} />
                  ) : (
                    files.map((file) => (
                      <FilePreview
                        key={file}
                        file={file}
                        deleteFile={deleteFile}
                      />
                    ))
                  )}
                </ul>
              )}
            </>
          )}
        ></Controller>
      )}
    </>
  );
}
