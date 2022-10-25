import { useAuthState } from '@/contexts/AuthContext';
import DashboardShell from '@/layout/DashboardShell';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import Error500 from '../error/500';
import { Link, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import UnstyledLink from '@/components/UnstyledLink';

export default function Dashboard() {
  const history = useHistory();
  const { data, error } = useSWR('/my_nst', {
    shouldRetryOnError: false,
    errorRetryInterval: 0,
  });
  useEffect(() => {
    if (data) {
      if (
        data.data.status === 'awaiting_payment' ||
        data.data.status === 'need_revision'
      ) {
        history.push(`/nst/payment`);
      }
    }
  }, [data, history]);

  if (error && error.response.status !== 404) {
    return <Error500 />;
  }
  if (!data && !error) return <Loading />;

  return (
    <DashboardShell>
      {error?.response.status === 404 ? (
        <div className='bg-white min-h-screen relative'>
          <div className='flex flex-col w-full px-4 py-8 font-secondary justify-center items-center text-black'>
            <p className='text-5xl p-6 font-bold mt-20'>SCHEMATICS NST</p>
            <p className='text-2xl md:w-3/5 w-full text-center'>
              Schematics National Seminar of Technology acara seminar yang
              dihadirkan untuk memberikan pengetahuan dan perkembangan seputar
              Teknologi Informasi terkini serta bagaimana teknologi tersebut
              berdampak pada berbagai sektor di Indonesia. Schematics NST dapat
              diikuti oleh masyarakat umum.
            </p>
          </div>
          <div className='w-full flex flex-row px-4 justify-center'>
            <div className='md:w-3/5 w-full flex flex-col items-center space-y-6'>
              <Link
                to='/nst/registration'
                className='w-full flex justify-center'
              >
                <button className='bg-nst hover:bg-nst-400 rounded-lg flex justify-center items-center text-white w-4/5'>
                  <p className='text-lg font-bold py-4 px-2'>
                    Daftar Schematics NST
                  </p>
                </button>
              </Link>
            </div>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/nst/guest-star.png`}
            alt=''
            className='w-full absolute bottom-0'
          />
        </div>
      ) : (
        <div className='bg-white py-4 min-h-screen font-secondary'>
          <div className='text-xs md:px-16 px-6 flex gap-x-2 font-medium text-[#24657A]'>
            <a href='/landing'>
              <p className='hover:text-gray-200'>Dashboard Peserta</p>
            </a>
            <p> &gt; </p>
            <p className='cursor-pointer'>Event</p>
            <p> &gt; </p>
            <p className='cursor-pointer'>Schematics NST</p>
          </div>
          <div className='md:px-16 px-6 py-16'>
            <div className='flex md:flex-row flex-col w-full justify-between md:space-y-0 space-y-10'>
              <div className='md:w-1/2 w-full bg-white rounded-lg px-4 pb-4 shadow-xl'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white bg-nst -translate-y-1/2 text-center rounded-lg py-2'>
                  Profil
                </p>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-md md:text-xl'>
                    Schematics NST
                  </h2>
                  <p className='text-nst hover:text-nst-100 text-xs md:text-sm my-auto cursor-pointer'>
                    Lengkapi data diri &gt;
                  </p>
                </div>
                <ul className=' list-inside mb-6'>
                  <div className='grid grid-cols-12 space-y-1 mt-4 text-sm md:text-md'>
                    <li className='col-span-5'>Nama</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].name}</p>
                    <li className='col-span-5'>Alamat</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].alamat}</p>
                    <li className='col-span-5'>No Telepon</li>
                    <p>:</p>
                    <p className='col-span-6'>{data.data.tickets[0].no_telp}</p>
                  </div>
                </ul>
                <hr />
                {data.data.status === 'active' ? (
                  <div className='flex justify-start text-green-500'>
                    <p className='text-sm mt-4 flex my-auto'>
                      <AiOutlineCheckCircle className='w-5 h-4 mx-2 my-auto' />
                      Akun anda telah aktif
                    </p>
                  </div>
                ) : (
                  <div className='flex justify-start'>
                    <p className='flex text-sm mt-4 my-auto text-black'>
                      <AiOutlineWarning className='w-5 h-4 mx-2 my-auto text-red-500' />
                      Lakukan Pembayaran untuk mengaktifkan akun anda
                    </p>
                  </div>
                )}
              </div>

              <div className='md:w-5/12 w-full shadow-xl rounded-lg pb-4'>
                <p className='w-1/3 text-md md:text-xl font-medium text-white -translate-y-1/2 bg-nst text-center rounded-lg py-2 ml-4'>
                  Ticket
                </p>
                <div className='w-11/12 mx-auto'>
                  <div className='flex justify-between'>
                    <p className='font-bold text-md xl:text-xl'>
                      Ticket Schematics NST
                    </p>
                    {data.data.status === 'active' ? (
                      <div></div>
                    ) : (
                      <a href='/nst/payment' target='_blank' rel='noreferrer'>
                        <p className='text-nst hover:text-nst-100 text-xs md:text-sm my-auto'>
                          Upload Bukti Pembayaran &gt;
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pemberitahuan Card*/}
            <div className='w-full flex justify-center mt-10 pb-20 mb:mx-4 mx-2  '>
              <div className='w-10/12 bg-white h-auto rounded-3xl p-5 overflow-auto'>
                <h2 className='text-nst font-primary text-3xl leading-9'>
                  Pemberitahuan
                </h2>
                <div className='mt-4 font-secondary text-lg'>
                  <tr>
                    <td>Lokasi :&nbsp;&nbsp;</td>
                    <td className=''>
                      Suroboyo Community Center, Marvel City Mall{' '}
                      <a
                        target={'_blank'}
                        className='text-nst font-semibold'
                        href='https://goo.gl/maps/a3s8oeaFd5V3nogL6'
                      >
                        &emsp;Buka peta
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Waktu :&nbsp;&nbsp;</td>
                    <td>09.00 - 15.00 WIB</td>
                  </tr>
                  <div className='ml-4 mt-2'>
                    <ul className='list-disc list-outside'>
                      <li>
                        Tidak ada penukaran tiket fisik, sehingga mohon
                        menunjukkan tiket digital / QR Code yang sudah terdapat
                        di setelah laman pembayaran
                      </li>
                      <li>
                        Open gate di jam 09.00 WIB, dimohon kepada peserta untuk
                        datang tepat waktu
                      </li>
                      <li>
                        Seluruh informasi mengenai acara Schematics NST bisa
                        diakses di sosial media Schematics
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pemberitahuan Content */}
              </div>
            </div>
            <div className='w-full md:h-64 h-96 bg-white px-6 pb-6 mt-16 rounded-xl shadow-xl'>
              <p className='md:w-1/5 text-xl bg-nst py-2 rounded-lg font-medium text-center md:text-center text-white -translate-y-1/2'>
                Pemberitahuan
              </p>
              <ul className='list-disc list-inside mt-2 font-medium text-lg'>
                <li>
                  Tiket akan dikirim melalui email pembeli dan dapat diakses
                  melalui dashboard pembeli setelah diverifikasi pembayarannya
                  oleh admin
                </li>
              </ul>
            </div>
          </div>
          {data.data.status === 'active' ? (
            <UnstyledLink
              href={`${process.env.PUBLIC_URL}/nst/ticket`}
              className=''
              openNewTab={false}
            >
              <div className='text-center bg-nst rounded-lg w-1/3 py-4 mx-auto text-white font-bold text-xl hover:bg-nst-300 cursor-pointer'>
                Unduh Tiket
              </div>
            </UnstyledLink>
          ) : (
            ''
          )}
        </div>
      )}
    </DashboardShell>
  );
}
