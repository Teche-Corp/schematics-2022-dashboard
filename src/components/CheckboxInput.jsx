import { useFormContext } from 'react-hook-form';

export default function CheckboxInput({ id, label, disabled = false }) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative flex items-center justify-center mt-1'>
        <input
          {...register(id)}
          type='checkbox'
          id={id}
          name={id}
          disabled={disabled}
          aria-describedby={id}
          className='w-10 h-10 border-gray-300 rounded-md shadow-sm text-dark-700 focus:ring-dark-400 focus:border-dark-400'
        />
        <div className='mt-1'></div>
      </div>
    </div>
  );
}
