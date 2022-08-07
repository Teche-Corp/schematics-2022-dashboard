import InputAdmin from '@/components/Admin/InputAdmin';
import ImageFetch from '../ImageFetch';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { bearerToken } from '@/lib/helper';
import { useHistory } from 'react-router-dom';
import ImageLightboxAdmin from '@/components/Admin/ImageLightboxAdmin';
import ValidasiAdmin from './ValidasiAdmin';

const validationList = [
  {
    value: 'active',
    text: 'Validasi',
  },
  {
    value: 'need_revision',
    text: 'Tolak Validasi',
  },
];

export default function DetailAnggota({ detailAnggota, index, from = '' }) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const history = useHistory();

  const API =
    from.split('-')[0] === 'npc'
      ? '/admin_verify_npc_member'
      : '/admin_verify_nlc_member';

  const verifikasiAnggota = (data) => {
    const formData = new FormData();
    formData.append('member_id', detailAnggota.member_id);
    formData.append('new_status', data.validasi);

    toast.promise(
      axios.post(API, formData, {
        headers: { ...bearerToken(), 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          history.push('/admin');
          return 'Berhasil merubah setatus verifikasi';
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  return (
    <>
      {/* <Input label={'Robby Ulung P'}/> */}
      <FormProvider {...methods}>
        <form
          className='flex justify-center mt-14'
          onSubmit={handleSubmit(verifikasiAnggota)}
        >
          <div className='w-1/2'>
            <h2 className='text-center text-white text-2xl font-primary'>
              {detailAnggota.member_type === 'ketua'
                ? 'Ketua'
                : `Anggota ${index}`}
            </h2>
            <InputAdmin
              value={detailAnggota && detailAnggota?.name}
              type='text'
              placeholder='Nama'
              disabled={true}
              label='Nama'
              id='nama'
              // validation={{ required: 'Nama tidak boleh kosong' }}
            />
            {/* Email Tidak ada dalam object */}
            {/* <InputAdmin
              value='robby@gmail.com'
              type='text'
              placeholder='email '
              disabled={true}
              label='Email'
              id='email'
              validation={{ required: 'Email tidak boleh kosong' }}
            /> */}
            <InputAdmin
              value={detailAnggota?.nisn}
              type='text'
              placeholder={from.split('-')[1] === 'senior' ? 'NIM' : 'NISN'}
              disabled={true}
              label={from === 'npc-senior' ? 'NIM' : 'NISN'}
              id='nisn'
              // validation={{ required: 'NISN tidak boleh kosong' }}
            />
            <ImageFetch
              imgpath={detailAnggota?.surat_url}
              tag='Scan KT Pelajar / Surat Keterangan Aktif'
            />
            <InputAdmin
              value={detailAnggota.no_telp}
              type='text'
              placeholder='Nomer telepon'
              disabled={true}
              label='Nomor telepon'
              id='no-tlpn'
              // validation={{ required: 'no-telp tidak boleh kosong' }}
            />
            <InputAdmin
              value={detailAnggota?.no_wa}
              type='text'
              placeholder='Nomer WA'
              disabled={true}
              label='Nomer WA'
              id='no-wa'
              // validation={{ required: 'no-wa tidak boleh kosong' }}
            />
            <InputAdmin
              value={detailAnggota?.id_line}
              type='text'
              placeholder='Id Line'
              disabled={true}
              label='ID Line'
              id='id-line'
              // validation={{ required: 'Id-Line tidak boleh kosong' }}
            />
            <InputAdmin
              value={detailAnggota?.alamat}
              type='text'
              placeholder='Alamat'
              disabled={true}
              label='Alamat'
              id='address'
              // validation={{ required: 'Alamat tidak boleh kosong' }}
            />
            <InputAdmin
              value={detailAnggota?.alamat}
              type='text'
              placeholder='Alamat'
              disabled={true}
              label='Alamat'
              id='address'
              // validation={{ required: 'Alamat tidak boleh kosong' }}
            />
            {/* Butki Upload Twibbon */}
            {from && from.split('-')[0] === 'npc' ? (
              <InputAdmin
                value={detailAnggota?.discord_tag}
                type='text'
                placeholder='Discord Tag'
                disabled={true}
                label='Discord Tag'
                id='discord-tag'
              ></InputAdmin>
            ) : null}

            <ImageFetch
              imgpath={detailAnggota?.bukti_twibbon_url}
              tag='Bukti Upload Twibbon'
            />
            <ImageFetch
              imgpath={detailAnggota?.bukti_twibbon_url}
              tag='Bukti Upload Poster'
            />

            <InputAdmin
              value='Pefizer'
              type='text'
              placeholder='Jenis Vaksin'
              disabled={true}
              label='Jenis Vaksin'
              id='jenis-vaksin'
              // validation={{ required: 'Jenis vaksin tidak boleh kosong' }}
            />
            <ImageFetch
              imgpath={detailAnggota?.bukti_twibbon_url}
              tag='Bukti Vaksin'
            />
            <ValidasiAdmin
              options={validationList}
              label='Validasi'
              // validation={{
              //   required: 'Asal informasi Schematics tidak boleh kosong',
              // }}
              id='validasi'
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
