import DragnDropInputBox from '@/components/DragnDropInputBox';
import Loading from '@/components/Loading';
import SubmitButton from '@/components/SubmitButton';
import DashboardShell from '@/layout/DashboardShell';
import { NLC_REGION, TEAM_STATUS } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';

function DashboardNLC() {
  const history = useHistory();
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const getNlcRegion = (region_id) => {
    const region = NLC_REGION.filter((region) => {
      return region.value.toString() === region_id;
    });
    return region[0].text;
  };

  const handleImageUpload = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key][0]);
    }
    toast.promise(
      axios.post('/upload_nlc_berkas', formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: 'Berhasil mengupload data',
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  const { data, error } = useSWR('/my_nlc', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });

  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push('/nlc/payment');
      }
    }
  }, [data, history]);

  if (error && error.response.status !== 404) return <Error500 />;
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      {error?.response.status === 404 ? (
        <div className='bg-dark-100 min-h-screen'>
          <div className='flex flex-col w-full px-4 py-8 font-primary items-center text-white'>
            <p className='text-3xl p-6'>
              Schematics{' '}
              <span className='text-nlc'>National Logic Competition</span>
            </p>
            <p className='text-lg md:w-3/5 w-full text-justify'>
              Schematics{' '}
              <span className='text-nlc'>National Logic Competition</span> 2022
              merupakan kompetisi yang menguji kemampuan{' '}
              <span className='text-nlc'>
                berpikir secara logis dan analitis
              </span>{' '}
              melalui berbagai persoalan dan permainan menarik.
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              <Link
                to='/nlc/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-nlc hover:bg-nlc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NLC Sebagai Ketua
                  </p>
                </button>
              </Link>
              <Link to='/nlc/join_team' className='w-full flex justify-center'>
                <button className='bg-nlc hover:bg-nlc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NLC Sebagai Anggota
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-dark-100 py-8 min-h-screen'>
          <div className='md:px-16 px-6'>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-3'>
              <div className='md:w-7/12 w-full bg-white rounded-lg p-4'>
                <p className='text-3xl font-bold text-left text-nlc'>
                  Profil Tim
                </p>
                <ul className='list-disc list-inside'>
                  <div className='grid grid-cols-12 space-y-3 mt-4 text-lg'>
                    <li className='col-span-5'>Nama Tim</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.nama_team}
                    </p>
                    <li className='col-span-5'>Asal Sekolah</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.asal_sekolah}
                    </p>
                    <li className='col-span-5'>Kota/Kabupaten</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>{data.data.kota}</p>
                    <li className='col-span-5'>Region</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {getNlcRegion(data.data.region)}
                    </p>
                    <li className='col-span-5'>Guru Pendamping (GP)</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.nama_guru_pendamping}
                    </p>
                    <li className='col-span-5'>No. Telepon GP</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {data.data.no_telp_guru_pendamping}
                    </p>
                    <li className='col-span-5'>Status Tim</li>
                    <p>:</p>
                    <p className='col-span-6 font-bold'>
                      {TEAM_STATUS[data.data.status]}
                    </p>
                  </div>
                </ul>
              </div>
              <div className='md:w-5/12 w-full grid grid-rows-6 md:pl-8 pl-0 space-y-3'>
                <div className='w-full row-span-4 bg-white p-4 rounded-lg'>
                  <div>
                    <p className='text-3xl font-bold text-left text-nlc'>
                      Ketua Tim
                    </p>
                    {data.data.members.map((member, index) => {
                      if (member.member_type === 'ketua') {
                        return (
                          <p className='mt-1 font-bold' key={index}>
                            {member.name}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div className='mt-2'>
                    <p className='text-3xl font-bold text-left text-nlc'>
                      Anggota Tim
                    </p>
                    <ul className='space-y-1 mt-1 font-bold'>
                      {data.data.members.map((member, index) => {
                        if (member.member_type === 'anggota') {
                          return <li key={index}>{member.name}</li>;
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className='w-full bg-white rounded-lg flex justify-center items-center'>
                  <p className='text-xl font-bold py-4 px-2'>
                    {`Kode Afiliasi: ${data.data.referral_code}`}
                  </p>
                </div>
                <a
                  href='https://drive.google.com/file/d/1QKap6V7x-k80DZ-1rCGuTIRRqaY4ceSH/view?usp=sharing'
                  target='_blank'
                  rel='noreferrer'
                >
                  <button className='w-full h-full bg-nlc hover:bg-white hover:text-nlc rounded-lg flex justify-center items-center'>
                    <p className='text-xl font-bold py-4 px-2'>
                      Unduh Guidebook
                    </p>
                  </button>
                </a>
              </div>
            </div>
            <div className='w-full bg-white p-6 mt-8 rounded-xl'>
              <div className='w-full'>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(handleImageUpload)}>
                    <div className='grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4'>
                      <div className='col-span-1'>
                        <DragnDropInputBox
                          label={
                            <span className='text-dark-400'>
                              Sertifikat Vaksinasi atau Surat Keterangan
                            </span>
                          }
                          id='bukti_vaksin'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='File dalam format jpg, png, atau jpeg maksimal 1 MB'
                          maxFiles={1}
                          validation={{
                            required:
                              'Sertifikat Vaksinasi atau Surat Keterangan tidak boleh kosong',
                          }}
                        />
                      </div>
                      <div className='col-span-1'>
                        <DragnDropInputBox
                          label={
                            <span className='text-dark-400'>
                              Bukti Upload Twibbon Media Sosial.{' '}
                              <a
                                href='https://drive.google.com/drive/folders/1MMaohKdSb3EmrSnq8E--Ssk15BX1lhzV'
                                className='text-nlc hover:text-nlc-300'
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
                      </div>
                      <div className='col-span-1'>
                        <DragnDropInputBox
                          label={
                            <span className='text-dark-400'>
                              Bukti Upload Poster Instagram Story.{' '}
                              <a
                                href='https://drive.google.com/file/d/1GOjom5-0FyyQkd1JNGxJiLjOrYKKxxBD/view?usp=sharing'
                                className='text-nlc hover:text-nlc-300'
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
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <SubmitButton
                        className='bg-nlc hover:bg-nlc-300 font-primary'
                        loading={false}
                      >
                        Daftar
                      </SubmitButton>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
            <div className='w-full md:h-64 h-96 bg-white p-6 mt-8 rounded-xl'>
              <p className='text-3xl font-bold text-center md:text-left text-nlc'>
                Pemberitahuan
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default DashboardNLC;
