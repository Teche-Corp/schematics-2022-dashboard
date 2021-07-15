import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

export default function SelectCity({ cities, disabled, validation }) {
  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      boxShadow: state.isFocused ? '0 0 0 0.1rem #252525' : 0,
      '*': {
        boxShadow: 'none !important',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'black',
      background: state.isSelected ? '#D1D5DB' : 'white',
      ':hover': {
        background: '#E5E7EB',
      },
    }),
  };

  const errorStyles = {
    control: (styles) => ({
      ...styles,
      border: 'none',
      boxShadow: '0 0 0 0.04rem #EF4444',
      '*': {
        boxShadow: 'none !important',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'black',
      background: state.isSelected ? '#D1D5DB' : 'white',
      ':hover': {
        background: '#E5E7EB',
      },
    }),
  };

  const options = cities.map((city) => {
    return {
      value: city.id,
      label: city.regency_name,
    };
  });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor='city' className='block text-sm font-normal text-gray-700'>
        Kota
      </label>
      <div className='relative mt-1'>
        <Controller
          name='city'
          id='city'
          isClearable
          control={control}
          rules={validation}
          render={({ field }) => {
            const styles = errors['city'] ? errorStyles : customStyles;
            return (
              <Select
                {...field}
                isDisabled={disabled}
                placeholder='Pilih kota'
                options={options}
                styles={styles}
              />
            );
          }}
        />
        {errors['city'] && (
          <span className='text-sm text-red-500'>{errors['city'].message}</span>
        )}
      </div>
    </div>
  );
}
