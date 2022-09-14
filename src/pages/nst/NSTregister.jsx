import DragnDropInput from '@/components/DragnDropInput';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import SelectInput2 from '@/components/SelectInput2';
import SelectInput from '@/components/SelectInput';
import SubmitButton from '@/components/SubmitButton';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '@/contexts/AuthContext';
import { useForm, FormProvider } from 'react-hook-form';
import { INFO_SCH } from '@/lib/constants';
import axios from 'axios';
import { bearerToken, getTicketOption } from '@/lib/helper';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error500 from '../error/500';

export default function ReevaRegister() {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const history = useHistory();
  const { user } = useAuthState();

  const handleReevaRegister = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (key === 'bukti_vaksin') {
        formData.append(`${key}`, data?.[key][0]);
      } else {
        if (key === 'jumlah_tiket' && data[key] === 5) {
          data[key] += 1;
        }
        formData.append(`${key}`, data?.[key]);
      }
    }

    toast.promise(
      axios.post('/order_nst_ticket', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/nst/payment');
          return 'Berhasil membeli tiket';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  const { data: nstOrder, error } = useSWR('/my_nst');

  useEffect(() => {
    if (nstOrder) {
      if (
        nstOrder.data.status === 'awaiting_payment' ||
        nstOrder.data.status === 'need_revision'
      ) {
        history.push(`/nst/payment`);
      }
      if (
        nstOrder.data.status === 'active' ||
        nstOrder.data.status === 'awaiting_verification'
      ) {
        history.push('/nst');
      }
    }
  }, [nstOrder, history]);

  if (error && error.response.status !== 404) {
    return <Error500 />;
  }

  if (!nstOrder && !error) return <Loading />;

  return (
    <div className='w-full bg-black min-h-screen'>
      <div className='md:w-3/6 w-11/12 mx-auto py-16'>
        <p className='md:text-5xl text-3xl font-primary text-center text-white'>
          Data Pendaftaran
        </p>
        <p className='md:text-2xl text-lg font-primary text-center text-white mt-4'>
          <span className='text-nst'>Gratis 1 tiket</span> untuk pembelian{' '}
          <span className='text-nst'>5 tiket</span> secara langsung! untuk 9
          pembeli pertama
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleReevaRegister)}
            className='space-y-4 mt-16'
          >
            <Input
              label={'Nama Lengkap'}
              id={'name'}
              defaultValue={user.name}
              validation={{
                required: 'Nama lengkap tidak boleh kosong',
                minLength: {
                  value: 4,
                  message: 'Nama lengkap setidaknya memiliki 4 karakter',
                },
                maxLength: {
                  value: 128,
                  message: 'Nama lengkap maksimal memiliki 128 karakter',
                },
              }}
            />
            <Input
              label='Email'
              id={'email'}
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
              label='Nomor Telepon atau Whatsapp'
              id={'no_telp'}
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
            <SelectInput2
              label='Darimana kamu mendapat informasi Schematics?'
              id='info_sch'
              options={INFO_SCH}
              validation={{
                required: 'Asal informasi Schematics tidak boleh kosong',
              }}
              placeholder='Pilih asal informasi Schematics'
            />
            <SelectInput
              label='Jumlah Tiket'
              id='jumlah_tiket'
              placeholder='Pilih jumlah tiket anda'
              options={getTicketOption(5)}
              validation={{
                required: 'Jumlah tiket tidak boleh kosong',
              }}
            />
            <p className='font-primary text-white text-xs'>
              *Max 1 akun 5 tiket
            </p>
            <DragnDropInput
              label='Sertifikat Vaksinasi atau Surat Keterangan Pengguna Tiket'
              id={'bukti_vaksin'}
              accept='image/png, image/jpg, image/jpeg'
              helperText='*File dalam format jpg, png, atau jpeg'
              maxFiles={1}
              validation={{
                required:
                  'Sertifikat Vaksinasi atau Surat Keterangan tidak boleh kosong',
              }}
            />
            <div>
              <SubmitButton
                className='mt-8 bg-reeva font-primary text-white'
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

// import DragnDropInput from '@/components/DragnDropInput';
// import toast from 'react-hot-toast';
// import Input from '@/components/Input';
// import SelectInput2 from '@/components/SelectInput2';
// import SubmitButton from '@/components/SubmitButton';
// import React, { useEffect, useState } from 'react';
// import { useAuthState } from '@/contexts/AuthContext';
// import { useForm, FormProvider } from 'react-hook-form';
// import { INFO_SCH, VACCINE_TYPE } from '@/lib/constants';
// import axios from 'axios';
// import { bearerToken } from '@/lib/helper';
// import { useHistory } from 'react-router-dom';
// import useSWR from 'swr';
// import Loading from '@/components/Loading';
// import Error500 from '../error/500';

// function NSTcard({ count }) {
//   return (
//     <>
//       <hr className={count === 0 ? 'hidden' : 'w-full bg-white'} />
//       <h1 className='text-white text-center text-xl font-bold'>
//         Tiket {count + 1}
//       </h1>
//       <Input
//         label={'Nama Lengkap'}
//         id={'name-' + count}
//         validation={{
//           required: 'Nama lengkap tidak boleh kosong',
//           minLength: {
//             value: 6,
//             message: 'Nama lengkap setidaknya memiliki 6 karakter',
//           },
//           maxLength: {
//             value: 128,
//             message: 'Nama lengkap maksimal memiliki 128 karakter',
//           },
//         }}
//       />
//       <Input
//         label='Email'
//         id={'email-' + count}
//         type='email'
//         validation={{
//           required: 'Email tidak boleh kosong',
//           pattern: {
//             value:
//               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//             message: 'Email tidak valid',
//           },
//         }}
//       />
//       <Input
//         label='Nomor Telepon'
//         id={'no_telp-' + count}
//         placeholder='+6285123456'
//         validation={{
//           required: 'Nomor Telepon tidak boleh kosong',
//           pattern: {
//             value: /^\+628[1-9][0-9]{7,11}$/,
//             message:
//               'Nomor Telepon harus diawali +62 dan memiliki panjang 12-16 karakter',
//           },
//         }}
//       />
//       <Input
//         label={'Alamat Domisili'}
//         id={'alamat-' + count}
//         validation={{
//           required: 'Alamat domisili tidak boleh kosong',
//           minLength: {
//             value: 16,
//             message: 'Alamat domisili setidaknya memiliki 16 karakter',
//           },
//           maxLength: {
//             value: 128,
//             message: 'Alamat domisili maksimal memiliki 128 karakter',
//           },
//         }}
//       />
//       {count === 0 && (
//         <SelectInput2
//           label='Darimana kamu mendapat informasi Schematics'
//           id='info_sch'
//           options={INFO_SCH}
//           validation={{
//             required: 'Asal informasi Schematics tidak boleh kosong',
//           }}
//           placeholder='Pilih asal informasi Schematics'
//         />
//       )}

//       {/*  */}
//       <SelectInput2
//         defaultValue={null}
//         label='Jenis Vaksinasi COVID-19'
//         options={VACCINE_TYPE}
//         validation={{
//           required: 'Jenis vaksinasi COVID-19 tidak boleh kosong',
//         }}
//         placeholder='Pilih jenis vaksinasi anda'
//         id={'tipe_vaksin-' + count}
//       />
//       <hr className='w-full bg-white' />
//       <DragnDropInput
//         label='Sertifikat Vaksinasi atau Surat Keterangan'
//         id={'bukti_vaksin-' + count}
//         accept='image/png, image/jpg, image/jpeg'
//         helperText='File dalam format jpg, png, atau jpeg'
//         maxFiles={1}
//         validation={{
//           required:
//             'Sertifikat Vaksinasi atau Surat Keterangan tidak boleh kosong',
//         }}
//       />
//       <br />
//     </>
//   );
// }

// export default function NSTregister() {
//   const methods = useForm();
//   const { control, handleSubmit } = methods;
//   const [cardAdd, setCardAdd] = useState([<NSTcard key={0} count={0} />]);
//   const history = useHistory();
//   const { user } = useAuthState();

//   function addCard() {
//     setCardAdd((prev) =>
//       prev.concat([<NSTcard key={prev.length} count={prev.length} />]),
//     );
//   }

//   // function to remove card
//   function removeCard() {
//     setCardAdd((prev) =>
//       prev.filter((card, index) => index !== prev.length - 1),
//     );
//   }

//   const handleNSTRegister = async (data) => {
//     const formData = new FormData();

//     for (let key in data) {
//       let id = key.split('-')[0];
//       let index = key.split('-')[1];

//       if (
//         id === 'info_sch' ||
//         index === undefined ||
//         data[key] === '' ||
//         data[key] === undefined ||
//         data[key][0] === undefined
//       )
//         continue;
//       if (['bukti_vaksin-' + index].includes(key)) {
//         formData.append(`ticket_orders[${index}][${id}]`, data?.[key][0]);
//       } else {
//         formData.append(`ticket_orders[${index}][${id}]`, data?.[key]);
//       }
//     }
//     formData.append('info_sch', data['info_sch']);

//     toast.promise(
//       axios.post('/order_nst_ticket', formData, {
//         headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
//       }),
//       {
//         loading: 'Loading...',
//         success: (res) => {
//           history.push('/nst/payment');
//           return 'Berhasil membeli tiket';
//         },
//         error: (err) => {
//           return err.response.data.message;
//         },
//       },
//     );
//   };

//   const { data: nstOrder, error } = useSWR('/my_nst', {
//     shouldRetryOnError: false,
//     errorRetryInterval: 0,
//   });

//   useEffect(() => {
//     if (nstOrder) {
//       if (
//         nstOrder.data.status === 'awaiting_payment' ||
//         nstOrder.data.status === 'need_revision'
//       ) {
//         history.push(`/nst/payment`);
//       }
//       if (
//         nstOrder.data.status === 'active' ||
//         nstOrder.data.status === 'awaiting_verification'
//       ) {
//         history.push('/nst');
//       }
//     }
//   }, [nstOrder, history]);

//   if (error && error.response.status !== 404) {
//     return <Error500 />;
//   }
//   if (!nstOrder && !error) return <Loading />;

//   return (
//     <div className='w-full bg-black'>
//       <div className='md:w-3/6 w-11/12 mx-auto py-16'>
//         <p className='md:text-5xl text-3xl font-primary text-center text-white'>
//           Data Pendaftaran
//         </p>
//         <FormProvider {...methods}>
//           {/* Loop  */}
//           <form
//             onSubmit={handleSubmit(handleNSTRegister)}
//             className='space-y-4 mt-16'
//           >
//             {/* <NSTcard count={count}/> */}

//             {cardAdd}
//             {cardAdd.length < 5 && (
//               <>
//                 <button
//                   className='text-neutral-400 bg-white px-4 py-2 mr-4 rounded-md font-primary text-center'
//                   onClick={addCard}
//                   type='button'
//                 >
//                   Tambah Tiket
//                 </button>
//                 {cardAdd.length > 1 && (
//                   <button
//                     className='text-neutral-400 bg-white px-4 py-2  rounded-md font-primary text-center'
//                     onClick={removeCard}
//                     type='button'
//                   >
//                     Hapus Tiket
//                   </button>
//                 )}
//               </>
//             )}
//             {cardAdd.length == 5 && (
//               <button
//                 className='text-neutral-400 bg-white px-4 py-2 rounded-md font-primary text-center'
//                 onClick={removeCard}
//                 type='button'
//               >
//                 Hapus Tiket
//               </button>
//             )}
//             <div>
//               <SubmitButton
//                 className='mt-8 bg-nst-400 font-primary'
//                 loading={false}
//               >
//                 Daftar
//               </SubmitButton>
//             </div>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// }
