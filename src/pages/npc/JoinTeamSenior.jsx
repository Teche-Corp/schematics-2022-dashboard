import DragnDropInput from '@/components/DragnDropInput';
import Input from '@/components/Input';
import SelectInput2 from '@/components/SelectInput2';
import SubmitButton from '@/components/SubmitButton';
import { useAuthState } from '@/contexts/AuthContext';
import { INFO_SCH } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

export default function JoinTeamSenior() {
  const methods = useForm();
  const history = useHistory();
  const { handleSubmit } = methods;
  const { user } = useAuthState();

  const handleJoinTeamSenior = (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (['surat'].includes(key)) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    toast.promise(
      axios.post('/register_npc_anggota', formData, {
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

  const { data: teamPayment, error: teamPaymentError } = useSWR('/my_npc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (teamPayment) {
      history.push('/landing');
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
            onSubmit={handleSubmit(handleJoinTeamSenior)}
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
              validation={{
                required: 'Nama lengkap tidak boleh kosong',
                minLength: {
                  value: 6,
                  message: 'Nama lengkap setidaknya memiliki 6 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Nama lengkap maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label='Email'
              id='email'
              type='email'
              defaultValue={user.email}
              validation={{
                required: 'Email tidak boleh kosong',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Email tidak valid',
                },
              }}
            />
            <Input
              label={'Nomor Induk Mahasiswa'}
              id='nisn'
              validation={{
                required: 'Nomor Induk Mahasiswa tidak boleh kosong',
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
              label={'ID Line (opsional)'}
              id='id_line'
              validation={{
                required: false,
              }}
            />
            <Input
              label={'Discord Tag'}
              id='discord_tag'
              validation={{
                required: 'Discord Tag tidak boleh kosong',
                maxLength: {
                  value: 128,
                  message: 'Discord Tag maksimal memiliki 128 karakter',
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
            <hr className='w-full bg-white' />
            <DragnDropInput
              label={
                <span>
                  diganti jadi "Screenshot Hasil Pencarian NISN".{' '}
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
            <div>
              <SubmitButton
                className='mt-16 bg-npc font-primary'
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
