import { useFormContext } from 'react-hook-form';

export default function NormalCheckboxInput({ id, label, disabled = false }) {
  const { register } = useFormContext();

  return (
    <div className='flex items-center justify-start gap-2'>
      <input
        {...register(id)}
        type='checkbox'
        id={id}
        name={id}
        disabled={disabled}
        aria-describedby={id}
        className='border-gray-300 shadow-sm text-dark-700 focus:ring-dark-400 focus:border-dark-400'
      />
      <label
        htmlFor={id}
        className='inline-block text-sm font-normal text-gray-700'
      >
        {label}
      </label>
    </div>
  );
}
