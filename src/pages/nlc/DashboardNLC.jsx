import DragnDropInputBox from '@/components/DragnDropInputBox';
import Loading from '@/components/Loading';
import SubmitButton from '@/components/SubmitButton';
import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import { NLC_REGION_GROUP, TEAM_STATUS } from '@/lib/constants';
import {
  bearerToken,
  getNLCTeamStatus,
  getTimeByTimeZone,
  isAbleNLCBingo,
  isNLCMemberHasBingo,
} from '@/lib/helper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import Error500 from '../error/500';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';

function DashboardNLC() {
  const location = useLocation();
  const { pathname } = location;
  const [nlcProfile, setNlcProfile] = useState(undefined);
  const { user } = useAuthState();
  const history = useHistory();
  const methods = useForm();
  const methodsBingo = useForm();
  const { handleSubmit: handleSubmitBingo } = methodsBingo;
  const { handleSubmit } = methods;

  const getNlcRegion = (region_id) => {
    const region = NLC_REGION_GROUP.filter((region) => {
      return region.value.toString() === region_id;
    });
    return region[0];
  };

  const handleGame = () => {
    // let currentDate = getTimeByTimeZone(7);
    // let h = currentDate.getHours();
    // let m = currentDate.getMinutes();
    // let d = currentDate.getDate();
    window.location.href = 'https://schematics.its.ac.id/sch-nlc-game/';
    // if (d < 25 || h < 9 || m < 30) {
    //   toast.error('Penyisihan fase game dapat dimulai saat 09.30 WIB');
    // } else {
    // }
  };

  const getMyNLCProfile = (nlcdata) => {
    const nlcMember = nlcdata.members;
    const myProfile = nlcMember.find((member) => member.name === user.name);
    setNlcProfile(myProfile);
  };

  const handleBingo = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key][0]);
    }
    toast.promise(
      axios.post('/upload_nlc_bingo', formData, {
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

  const showToast = () => {
    toast.error('Pendaftaran sudah ditutup!');

    history.push(`${pathname}`);
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

  const { data, error } = useSWR('/my_nlc');

  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push('/nlc/payment');
      }
      getMyNLCProfile(data.data);
    }
  }, [data, history]);

  if (error && error.response.status !== 404) return <Error500 />;
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      <Toaster position='top-center' reverseOrder={false} />
      {error?.response.status === 404 ? (
        <div className='bg-white min-h-[calc(100vh-64px)] relative'>
          <div className='flex flex-col w-full px-4 py-8 pt-[6%] font-secondary items-center text-black'>
            <p className='text-5xl p-6 font-bold'>SCHEMATICS NLC</p>
            <p className='text-2xl md:w-4/5 w-full text-center font-normal leading-10'>
              Schematics National Logic Competition 2022 merupakan kompetisi
              yang menguji kemampuan berpikir secara logis dan analitis melalui
              berbagai persoalan dan permainan menarik.
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              {/* <Link to='/landing' className='w-full flex justify-center'> */}
              <button
                onClick={() => showToast()}
                className='mt-10 bg-nlc hover:bg-nlc-400 rounded-lg flex justify-center items-center text-white w-4/5'
              >
                <p className='text-xl font-bold py-4 px-2'>Daftar Sekarang</p>
              </button>
              {/* </Link> */}
              {/* <Link
                to='/npc_senior/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NPC Senior Sebagai Ketua
                  </p>
                </button>
              </Link>
              <Link
                to='/npc_senior/join_team'
                className='w-full flex justify-center'
              >
                <button className='bg-npc hover:bg-npc-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NPC Senior Sebagai Anggota
                  </p>
                </button>
              </Link> */}
            </div>
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/images/nlc/nlc-left.png`}
            alt=''
            className='absolute bottom-0 -left-16 w-[33%]'
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/nlc/nlc-mid.png`}
            alt=''
            className='absolute bottom-0 right-[35%] w-[30%]'
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/nlc/nlc-right.png`}
            alt=''
            className='absolute bottom-0 right-0 w-[30%]'
          />
        </div>
      ) : (
        <div className='bg-white py-8 min-h-screen'>
          <div className='md:px-16 px-6'>
            <div className='pb-16 text-sm flex gap-x-2 font-medium text-[#24657A]'>
              <a href='/landing'>
                <p className='hover:text-gray-400'>Dashboard Peserta</p>
              </a>
              <p> &gt; </p>
              <p className='cursor-pointer'>Event</p>
              <p> &gt; </p>
              <p className='cursor-pointer'>Schematics NLC</p>
            </div>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-3'>
              <div className='md:w-1/2 w-full bg-white rounded-lg px-4 shadow-xl'>
                <p className='text=md md:text-xl font-medium text-center text-white bg-nlc w-1/5 -translate-y-1/2 py-2 rounded'>
                  Profil Tim
                </p>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-md md:text-xl'>
                    Schematics NLC
                  </h2>
                  <p
                    className='text-nlc hover:text-nlc-200 text-xs md:text-sm my-auto cursor-pointer'
                    onClick={() => showToast()}
                  >
                    Lengkapi data diri &gt;
                  </p>
                </div>
                <ul className='list-inside mb-6'>
                  <div className='grid grid-cols-12 space-y-1 mt-4 text-sm md:text-lg'>
                    <li className='col-span-5'>Nama Ketua Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.members[0].name}</p>
                    <li className='col-span-5'>Nama Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.nama_team}</p>
                    <li className='col-span-5'>Asal Sekolah</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.asal_sekolah}</p>
                    <li className='col-span-5'>Kota/Kabupaten</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.kota}</p>
                    <li className='col-span-5'>Region</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {getNlcRegion(data.data.region).text}
                    </p>
                    <li className='col-span-5'>Guru Pendamping (GP)</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {data.data.nama_guru_pendamping}
                    </p>
                    <li className='col-span-5'>No. Telepon GP</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {data.data.no_telp_guru_pendamping}
                    </p>
                    {/* <li className='col-span-5'>Status Tim</li>
                    <p>:</p>
                    <p className='col-span-6'>
                      {TEAM_STATUS[getNLCTeamStatus(data.data)]}
                    </p> */}
                    {/* {getNLCTeamStatus(data.data) === 'active' && (
                      <>
                        <li className='col-span-5'>
                          Link Grup Whatsapp Region
                        </li>
                        <p>:</p>
                        <p className='col-span-6'>
                          <a
                            className='text-nlc hover:text-nlc-200'
                            href={getNlcRegion(data.data.region).waGroup}
                          >
                            Di sini
                          </a>
                        </p>
                      </>
                    )} */}
                  </div>
                  {user.sertifikat?.nlc_penyisihan && (
                    <div className='w-full flex justify-center items-center mt-5'>
                      <button className='text-center bg-nlc hover:bg-yellow-200 font-secondary px-8 py-3 my-5 font-bold rounded-xl text-white'>
                        <a href={user.sertifikat?.nlc_penyisihan}>SERTIFIKAT</a>
                      </button>
                    </div>
                  )}
                </ul>
                <hr />
                {getNLCTeamStatus(data.data) === 'active' && (
                  <div className='flex justify-start text-green-500 pb-4'>
                    <p className='text-sm mt-4 flex my-auto'>
                      <AiOutlineCheckCircle className='w-5 h-4 mx-2 my-auto' />
                      Akun tim anda telah aktif
                    </p>
                  </div>
                )}
              </div>

              <div className='md:w-5/12 w-full space-y-3 grid'>
                <div className='shadow-xl rounded-xl space-y-3 md:pl-8 pl-0 row-span-4 mb-4'>
                  <div className='w-full bg-white rounded-lg'>
                    <p className='w-1/3 text-md md:text-xl font-medium text-white -translate-y-1/2 bg-nlc text-center rounded-lg py-2'>
                      Link Penting
                    </p>
                  </div>
                  {getNLCTeamStatus(data.data) === 'active' && (
                    <div className='mx-auto'>
                      <div className='flex justify-between'>
                        <p className='font-bold text-md md:text-xl'>
                          Kode Afiliasi : {data.data.referral_code}
                        </p>
                        <p
                          className='text-nlc hover:text-nlc-200 text-xs md:text-sm my-auto pr-2 cursor-pointer'
                          onClick={() => showToast()}
                        >
                          Unduh Guidebook &gt;
                        </p>
                      </div>
                      <ul className='list-inside'>
                        <div className='grid grid-cols-12 text-sm md:text-lg mt-4'>
                          <li className='col-span-5'>Link Grup WA Region</li>
                          <p>:</p>
                          <p
                            className='col-span-6 text-nlc hover:text-nlc-200 cursor-pointer'
                            onClick={() => showToast()}
                          >
                            Klik Disini
                          </p>
                          <li className='col-span-5'>Username Lomba</li>
                          <p>:</p>
                          <p className='col-span-6'></p>
                          <li className='col-span-5'>Password Lomba</li>
                          <p>:</p>
                          <p className='col-span-6'></p>
                          <li className='col-span-5'>Link Moodle</li>
                          <p>:</p>
                          <p className='col-span-6 text-nlc hover:text-nlc-200'></p>
                          <li className='col-span-5'>Link Game</li>
                          <p>:</p>
                          <p className='col-span-6 text-nlc hover:text-nlc-200'></p>
                          <li className='col-span-5'>Link Feedback</li>
                          <p>:</p>
                          <p className='col-span-6 text-nlc hover:text-nlc-200'></p>
                        </div>
                      </ul>
                    </div>
                  )}
                  {/* <a
                    href='https://drive.google.com/drive/folders/1TgcidIjyzGt7xXtmqJ6ty24EboesImsI?usp=sharing'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <button className='w-full h-full bg-nlc hover:bg-white hover:text-nlc rounded-lg flex justify-center items-center'>
                      <p className='text-xl font-bold py-4 px-2'>
                        Unduh Contoh Soal
                      </p>
                    </button>
                  </a> */}
                </div>
                <div
                  className='w-full md:w-2/3 mx-auto bg-nlc row-span-1 justify-end rounded-xl flex cursor-pointer hover:bg-nlc-300 shadow-lg'
                  onClick={() => showToast()}
                >
                  <p className='mx-auto my-auto text-white font-primary'>
                    Unduh Soal
                  </p>
                </div>
              </div>
            </div>
            {getNLCTeamStatus(data.data) === 'awaiting_file_upload' && (
              <div className='w-full bg-white p-6 mt-8 rounded-xl shadow-xl'>
                <div className='w-full'>
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleImageUpload)}>
                      <div className='grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4'>
                        <div className='col-span-1'>
                          <DragnDropInputBox
                            defaultValue={
                              nlcProfile?.bukti_vaksin_url ?? undefined
                            }
                            label={
                              <span className='text-dark-400'>
                                Sertifikat Vaksinasi atau Surat Keterangan
                              </span>
                            }
                            id='bukti_vaksin'
                            accept='image/png, image/jpg, image/jpeg'
                            helperText='*File dalam format jpg, png, atau jpeg maksimal 1 MB'
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
                                  Twibbon di sini
                                </a>
                              </span>
                            }
                            defaultValue={
                              nlcProfile?.bukti_twibbon_url ?? undefined
                            }
                            id='bukti_twibbon'
                            accept='image/png, image/jpg, image/jpeg'
                            helperText='*File dalam format jpg, png, atau jpeg maksimal 1 MB'
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
                                  Poster di sini
                                </a>
                              </span>
                            }
                            defaultValue={
                              nlcProfile?.bukti_poster_url ?? undefined
                            }
                            id='bukti_poster'
                            accept='image/png, image/jpg, image/jpeg'
                            helperText='*File dalam format jpg, png, atau jpeg maksimal 1 MB'
                            maxFiles={1}
                            validation={{
                              required:
                                'Bukti Upload Poster Instagram Story tidak boleh kosong',
                            }}
                          />
                        </div>
                      </div>
                      {!nlcProfile?.bukti_vaksin_url && (
                        <div className='w-full'>
                          <SubmitButton
                            className='bg-nlc hover:bg-nlc-300 font-primary'
                            loading={false}
                          >
                            Upload
                          </SubmitButton>
                        </div>
                      )}
                    </form>
                  </FormProvider>
                </div>
              </div>
            )}
            <div className='w-full bg-white px-6 pb-6 mt-16 rounded-xl shadow-xl font-secondary'>
              <h1 className='md:w-1/5 text-xl bg-nlc py-2 rounded-lg font-medium text-center md:text-center text-white -translate-y-1/2'>
                Contoh Soal
              </h1>
              <h1 className='text-lg'>
                Untuk mendapatkan contoh soal tahun lalu, tim anda dapat
                melakukan upload bukti share broadcast{' '}
                <span>
                  <a
                    href='https://drive.google.com/drive/folders/1I0snDZbndT_evY15eyKJc5fmza74qxh9?usp=sharing'
                    className='text-nlc hover:text-nlc-400'
                  >
                    ini
                  </a>
                </span>{' '}
                kepada 3 grup
              </h1>
              <div className='w-full my-4'>
                <FormProvider {...methodsBingo}>
                  <form onSubmit={handleSubmitBingo(handleBingo)}>
                    <div className='grid grid-cols-1 grid-rows-1'>
                      <div className='col-span-1'>
                        <DragnDropInputBox
                          defaultValue={nlcProfile?.bingo_file_url ?? undefined}
                          label={''}
                          id='bingo_file'
                          accept='image/png, image/jpg, image/jpeg'
                          helperText='File dalam format jpg, png, atau jpeg maksimal 1 MB'
                          maxFiles={1}
                          validation={{
                            required:
                              'Bukti share broadcast ke 3 grup tidak boleh kosong',
                          }}
                        />
                      </div>
                    </div>
                    {!nlcProfile?.bingo_file_url && (
                      <div className='w-full'>
                        <SubmitButton
                          className='bg-nlc hover:bg-nlc-300 font-secondary font-bold text-white'
                          loading={false}
                        >
                          Upload
                        </SubmitButton>
                      </div>
                    )}
                  </form>
                </FormProvider>
              </div>
            </div>
            <div className='w-full md:h-64 h-96 bg-white px-6 pb-6 mt-16 rounded-xl shadow-xl'>
              <p className='md:w-1/5 text-xl bg-nlc py-2 rounded-lg font-medium text-center md:text-center text-white -translate-y-1/2'>
                Pengumuman
              </p>
              <ul className='list-disc list-inside mt-2 text-lg'>
                <li>
                  Untuk tim yang berstatus Aktif, mohon untuk segera masuk ke
                  grup WA region melalui link yang tertera pada dashboard
                </li>
                <li>
                  Untuk tim yang berstatus "Menunggu anggota mengupload file
                  pendaftaran", mohon untuk setiap anggota segera melengkapi
                  berkas bukti vaksin, bukti bagikan poster, dan bukti upload
                  twibbon
                </li>
                {getNLCTeamStatus(data.data) === 'active' && (
                  <li>
                    Anda dapat mengakses contoh soal tahun lalu pada link
                    berikut{' '}
                    <span>
                      <a
                        href='https://drive.google.com/file/d/1tfL7FGSpnfjGm2BtCnKfHisYQ54d-u79/view?usp=sharing'
                        className='text-nlc hover:text-nlc-400'
                      >
                        Contoh Soal Tahun Lalu
                      </a>
                    </span>
                  </li>
                )}
                {isAbleNLCBingo(data.data) && (
                  <li>
                    Anda dapat mengakses video pembahasan contoh soal tahun lalu
                    pada link berikut{' '}
                    <span>
                      <a
                        href='https://drive.google.com/file/d/169LVAcx8cD79p1t-PdUp3dZRus8WVNxl/view?usp=sharing'
                        className='text-nlc hover:text-nlc-400'
                      >
                        Video Pembahasan
                      </a>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default DashboardNLC;
