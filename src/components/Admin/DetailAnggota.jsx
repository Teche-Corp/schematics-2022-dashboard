import InputAdmin from '@/components/Admin/InputAdmin';
import { FormProvider, useForm } from 'react-hook-form';
import DragnDropInput from '../DragnDropInput';
import SelectInput from '../SelectInput';
import SubmitButton from '../SubmitButton';
import ImageLightboxAdmin from './ImageLightboxAdmin';
import ValidasiAdmin from './ValidasiAdmin';
const validationList = [
  {
    value: 'validasi',
    text: 'Validasi',
  },
  {
    value: 'tolak-validasi',
    text: 'Tolak Validasi',
  },
];

export default function DetailAnggota({ event, data }) {
  const methods = useForm();

  return (
    <>
      {/* <Input label={'Robby Ulung P'}/> */}
      <FormProvider {...methods}>
        <form className='flex justify-center mt-14'>
          <div className='w-1/2'>
            <h2 className='text-center text-white text-2xl font-primary'>
              Anggota 1
            </h2>
            <InputAdmin
              value='Robby Ulung P'
              type='text'
              placeholder='Nama '
              disabled='true'
              label='Nama'
              id='nama'
              validation={{ required: 'Nama tidak boleh kosong' }}
            />
            <InputAdmin
              value='robby@gmail.com'
              type='text'
              placeholder='email '
              disabled='true'
              label='Email'
              id='email'
              validation={{ required: 'Email tidak boleh kosong' }}
            />
            <InputAdmin
              value='501231231231'
              type='text'
              placeholder='nsin '
              disabled='true'
              label='NISN'
              id='nisn'
              validation={{ required: 'NISN tidak boleh kosong' }}
            />

            <ImageLightboxAdmin
              src={`${process.env.PUBLIC_URL}/images/qris.jpg`}
              alt='Cek Gambar'
              label='Scan KT Pelajar / surat keterangan aktif / surat tugas'
            />
            <InputAdmin
              value='0812321321'
              type='text'
              placeholder='Nomer telepon'
              disabled='true'
              label='Nomor telepon'
              id='no-tlpn'
              validation={{ required: 'no-telp tidak boleh kosong' }}
            />
            <InputAdmin
              value='0812321321'
              type='text'
              placeholder='Nomer WA'
              disabled='true'
              label='Nomer WA'
              id='no-wa'
              validation={{ required: 'no-wa tidak boleh kosong' }}
            />
            <InputAdmin
              value='robbypambudi'
              type='text'
              placeholder='Id Line'
              disabled='true'
              label='ID Line'
              id='id-line'
              validation={{ required: 'Id-Line tidak boleh kosong' }}
            />
            <InputAdmin
              value='Surabaya Jawa Timur'
              type='text'
              placeholder='Alamat'
              disabled='true'
              label='Alamat'
              id='address'
              validation={{ required: 'Alamat tidak boleh kosong' }}
            />
            <ImageLightboxAdmin
              src={`${process.env.PUBLIC_URL}/images/error-icon.png`}
              alt='Cek Gambar'
              label='Bukti Up Twibbon'
            />
            <ImageLightboxAdmin
              src={`${process.env.PUBLIC_URL}/images/qris.jpg`}
              alt='Cek Gambar'
              label='Sg Poster'
            />
            <InputAdmin
              value='Pefizer'
              type='text'
              placeholder='Jenis Vaksin'
              disabled='true'
              label='Jenis Vaksin'
              id='jenis-vaksin'
              validation={{ required: 'Jenis vaksin tidak boleh kosong' }}
            />
            <ImageLightboxAdmin
              src={`${process.env.PUBLIC_URL}/images/qris.jpg`}
              alt='Cek Gambar'
              label='Bukti Vaksin'
            />
            <ValidasiAdmin
              options={validationList}
              label='Validasi'
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              id='validasi'
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
