import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { HiOutlineEye, HiOutlinePaperClip, HiX } from 'react-icons/hi';

import { classNames } from '@/lib/helper';
import UnstyledLink from '@/components/UnstyledLink';

const FilePreview = ({ file, deleteFile }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteFile(e, file);
  };

  return (
    <>
      <li
        className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
        key={file.name}
      >
        <div className='flex items-center flex-1 w-0'>
          <HiOutlinePaperClip
            className='flex-shrink-0 w-5 h-5 text-gray-400'
            aria-hidden='true'
          />
          <span className='flex-1 w-0 ml-2 truncate'>{file.name}</span>
        </div>
        <div className='flex-shrink-0 ml-4'>
          <UnstyledLink
            href={URL.createObjectURL(file)}
            className='inline-block mr-2 text-xl font-medium text-gray-500 focus:outline-none hover:text-gray-700'
          >
            <HiOutlineEye />
          </UnstyledLink>
          <button
            onClick={handleDelete}
            className='text-xl font-medium text-red-500 focus:outline-none hover:text-red-700'
          >
            <HiX />
          </button>
        </div>
      </li>
    </>
    // <div key={file.name} className='aspect-w-3 aspect-h-2'>
    //   <img
    //     src={URL.createObjectURL(file)}
    //     alt={file.name}
    //     className='object-cover rounded-lg shadow-lg'
    //   />
    //   <button
    //     onClick={(e) => deleteFile(e, file)}
    //     className='absolute top-0 right-0 flex p-2 leading-none'
    //   >
    //     <HiX size={24} className='text-red-500 cursor-pointer' />
    //   </button>
    // </div>
  );

  // file.type === 'application/pdf' ? (
  //   <div key={file.name} className='shadow-lg aspect-w-3 aspect-h-2'>
  //     <div className='flex flex-col items-center justify-center'>
  //       <FaFilePdf className='text-red-600' size={32} />
  //       <p className='mt-1'>{file.name}</p>
  //     </div>
  //     <button
  //       onClick={(e) => deleteFile(e, file)}
  //       className='absolute top-0 right-0 flex p-2 leading-none'
  //     >
  //       <HiX size={24} className='text-red-500 cursor-pointer' />
  //     </button>
  //   </div>
  // ) :
};

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
  });

  return (
    <>
      <label className='block text-sm font-normal text-gray-700' htmlFor={id}>
        {label}
      </label>

      {files?.length >= maxFiles ? (
        <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
          {files.map((file) => (
            <FilePreview key={file} file={file} deleteFile={deleteFile} />
          ))}
        </ul>
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
          {!!files?.length && (
            <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
              {files.map((file) => (
                <FilePreview key={file} file={file} deleteFile={deleteFile} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
