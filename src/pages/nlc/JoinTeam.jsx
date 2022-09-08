import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import SelectInput2 from '@/components/SelectInput2';
import SubmitButton from '@/components/SubmitButton';
import { useAuthState } from '@/contexts/AuthContext';
import { INFO_SCH, VACCINE_TYPE } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

export default function JoinTeam() {
  const methods = useForm();
  const history = useHistory();
  const { handleSubmit } = methods;
  const { user } = useAuthState();

  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_nlc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  const handleJoinTeam = (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (
        ['bukti_poster', 'bukti_twibbon', 'bukti_vaksin', 'surat'].includes(key)
      ) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    toast.promise(
      axios.post('/register_nlc_anggota', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/landing');
          return 'Berhasil masuk ke dalam tim';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  useEffect(() => {
    if (teamPayment) {
      if (
        teamPayment.data.status === 'active' ||
        teamPayment.data.status === 'awaiting_verification'
      ) {
        history.push('/landing');
      }
      if (
        teamPayment.data.status === 'need_revision' ||
        teamPayment.data.status === 'awaiting_payment'
      ) {
        history.push('/nlc/payment');
      }
    }
  }, [teamPayment]);

  return (
    <div className='w-full bg-dark-400 min-h-screen'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleJoinTeam)}
            className='space-y-4 mt-16'
          >
            <Input
              label={'Kode Afiliasi Tim'}
              validation={{
                required: 'Kode afiliasi tim tidak boleh kosong',
                pattern: {
                  value: /^[A-Z0-9]{6}$/,
                  message:
                    'Kode afiliasi harus berupa angka dan huruf kapital sepanjang 6 karakter',
                },
              }}
              id='kode_referral'
            />
            <hr className='bg-white w-full' />
            <Input
              label={'Nama Lengkap'}
              id='name'
              defaultValue={user.name}
              disabled={true}
            />
            <Input
              label='Email'
              id='email'
              type='email'
              defaultValue={user.email}
              disabled={true}
            />
            <Input
              label={'NISN'}
              id='nisn'
              validation={{
                required: 'NISN tidak boleh kosong',
                pattern: {
                  value: /^[0-9]{5}$/,
                  message:
                    'NISN Harus berupa angka dan memiliki panjang 5 karakter',
                },
              }}
            />
            <Input
              label='Nomor Telepon'
              id='no_telp'
              defaultValue={user.no_telp}
              placeholder='+6285123456'
              validation={{
                required: 'Nomor Telepon tidak boleh kosong',
                pattern: {
                  value: /^\+628[1-9][0-9]{7,11}$/,
                  message:
                    'Nomor Telepon harus diawali +62 dan memiliki panjang 12-16 karakter',
                },
              }}
            />
            <Input
              label='Nomor Whatsapp'
              id='no_wa'
              defaultValue={user.no_telp}
              placeholder='+6285123456'
              validation={{
                required: 'Nomor Whatsapp tidak boleh kosong',
                pattern: {
                  value: /^\+628[1-9][0-9]{7,11}$/,
                  message:
                    'Nomor Whatsapp harus diawali +62 dan memiliki panjang 12-16 karakter',
                },
              }}
            />
            <Input
              label={'ID Line'}
              id='id_line'
              validation={{
                required: 'ID Line tidak boleh kosong',
                maxLength: {
                  value: 128,
                  message: 'Id Line maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label={'Alamat Domisili'}
              id='alamat'
              validation={{
                required: 'Alamat domisili tidak boleh kosong',
                minLength: {
                  value: 16,
                  message: 'Alamat domisili setidaknya memiliki 16 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Alamat domisili maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label='Darimana kamu mendapat informasi Schematics'
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              id='info_sch'
            />
            {/* <SelectInput
              label='Jenis Vaksinasi COVID-19'
              options={VACCINE_TYPE}
              validation={{
                required: 'Jenis vaksinasi COVID-19 tidak boleh kosong',
              }}
              placeholder='Pilih jenis vaksinasi anda'
              id='jenis_vaksin'
            /> */}
            <hr className='w-full bg-white' />
            {/* <DragnDropInput
              label='Sertifikat Vaksinasi atau Surat Keterangan'
              id='bukti_vaksin'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Sertifikat Vaksinasi atau Surat Keterangan tidak boleh kosong',
              }}
            /> */}
            <DragnDropInput
              label={
                <span>
                  Screenshot Hasil Pencarian NISN.{' '}
                  <a
                    href='https://nisn.data.kemdikbud.go.id/index.php/Cindex/formcaribynama'
                    className='text-white hover:text-nlc-300'
                  >
                    Cek Di Sini
                  </a>
                </span>
              }
              id='surat'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Kartu Pelajar/Surat Keterangan Aktif/Surat Tugas tidak boleh kosong',
              }}
            />
            {/* <DragnDropInput
              label={
                <span>
                  Bukti Upload Twibbon Media Sosial.{' '}
                  <a
                    href='https://drive.google.com/drive/folders/1MMaohKdSb3EmrSnq8E--Ssk15BX1lhzV'
                    className='text-white hover:text-nlc-300'
                  >
                    Twibbon Disini
                  </a>
                </span>
              }
              id='bukti_twibbon'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg maksimal 1 MB'
              maxFiles={1}
              validation={{
                required:
                  'Bukti Upload Twibbon Media Sosial tidak boleh kosong',
              }}
            />
            <DragnDropInput
              label={
                <span>
                  'Bukti Upload Poster Instagram Story.
                  <a
                    href='https://drive.google.com/file/d/1GOjom5-0FyyQkd1JNGxJiLjOrYKKxxBD/view?usp=sharing'
                    className='text-white hover:text-nlc-300'
                  >
                    Poster Disini
                  </a>
                </span>
              }
              id='bukti_poster'
              accept='image/png, image/jpg, image/jpeg'
              helperText='File dalam format jpg, png, atau jpeg maksimal 1 MB'
              maxFiles={1}
              validation={{
                required:
                  'Bukti Upload Poster Instagram Story tidak boleh kosong',
              }}
            /> */}
            <div>
              <SubmitButton
                className='mt-16 bg-nlc-300 font-primary'
                loading={false}
              >
                Daftar
              </SubmitButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
