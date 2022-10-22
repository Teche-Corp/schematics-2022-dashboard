import DashboardAdminShell from '@/layout/DashboardAdminShell';
import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

class Sheat {
  constructor(name, id, status) {
    this.name = name;
    this.id = id;
    this.status = status;
    this.isDisable = false;
  }
}

export default function LayoutKursi() {
  const [sheets, setSheets] = useState([]);

  const ResetSheat = () => {
    localStorage.removeItem('sheets');
    setSheets([]);
    generateSheet();
  };

  const total_row_sheet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'AA',
    'AB',
    'AC',
    'AD',
  ];
  useEffect(() => {
    if (localStorage.getItem('sheets') === null) {
      generateSheet();
    }
    if (sheets.length === 0) {
      setSheets(JSON.parse(localStorage.getItem('sheets')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheets]);

  const generateSheet = () => {
    const total_column_sheet = 10;
    const sheets = [];
    let coutKursi = 1;
    for (let i = 0; i < total_row_sheet.length; i++) {
      for (let j = 0; j < total_column_sheet; j++) {
        sheets.push(new Sheat(`${coutKursi++}`, `${i}${j}`, false));
      }
    }
    const sheat1 = ['240', '241', '242', '243', '244'];
    const sheat2 = [
      '280',
      '281',
      '282',
      '283',
      '284',
      '285',
      '286',
      '287',
      '288',
      '289',
    ];
    const sheet3 = ['10', '50', '90', '130', '170', '210', '250', '290'];
    const sheet4 = [
      '10',
      '50',
      '90',
      '130',
      '170',
      '210',
      '250',
      '290',
      '93',
      '94',
      '131',
      '132',
      '133',
      '134',
    ];
    const sheet5 = [
      '251',
      '211',
      '212',
      '171',
      '172',
      '173',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
    ];
    const sheet6 = [
      '109',
      '108',
      '107',
      '106',
      '149',
      '148',
      '147',
      '189',
      '188',
      '239',
    ];
    const sheet7 = ['39', '38', '37', '36'];
    const disable_kursi = [
      ...sheat1,
      ...sheat2,
      ...sheet3,
      ...sheet4,
      ...sheet5,
      ...sheet6,
      ...sheet7,
    ];
    for (let i = 0; i < disable_kursi.length; i++) {
      sheets[disable_kursi[i]].isDisable = true;
      sheets[disable_kursi[i]].status = true;
    }

    localStorage.setItem('sheets', JSON.stringify(sheets));
  };

  const changeSheetStatus = (id) => {
    const sheets = JSON.parse(localStorage.getItem('sheets'));
    const sheet = sheets.find((sheet) => sheet.id === id);
    if (sheet.isDisable) {
      return;
    }
    sheet.status = !sheet.status;
    localStorage.setItem('sheets', JSON.stringify(sheets));
    setSheets(JSON.parse(localStorage.getItem('sheets')));
  };

  return (
    <DashboardAdminShell>
      <div className='p-8'>
        {/* Create sheet */}
        <h1 className='text-center font-bold'>Layout Kursi NST</h1>
        <p>Jumlah Total Kursi : {sheets.length}</p>
        {/* Filter Kursi is ALredy */}
        <p>
          Jumlah Kursi Terisi : {sheets.filter((sheet) => sheet.status).length}
        </p>
        <p>
          Jumlah Kursi Kosong : {sheets.filter((sheet) => !sheet.status).length}
        </p>
        <button
          className='px-6 py-2 bg-nst-blue rounded-xl text-white my-2'
          onClick={() => ResetSheat()}
          type='button'
        >
          <p>Reset Kursi</p>
        </button>
        {/* Card */}
        <div className='w-full shadow-md p-5 bg-white mt-3 min-h-screen flex justify-start flex-col items-start overflow-auto gap-x-3 relative'>
          <div
            className='sticky px-4 py-2 border border-black mb-5 rounded inline-flex center left-1/2 w-52'
            onClick={() => ResetSheat()}
          >
            <p className='mx-auto'>Main Stage</p>
          </div>
          <div className='flex justify-between items-center w-max'>
            {/* Kolom*/}
            <div className='space-y-3'>
              {/* Sheet */}
              {total_row_sheet.map((row, index) => {
                if (index < 8) {
                  return (
                    <div className='flex flex-col space-y-4 ml-5'>
                      <div className='flex gap-x-3 rotate-45'>
                        {sheets
                          .slice(index * 40, index * 40 + 10)
                          .map((sheet, index) => {
                            return (
                              <div
                                key={index}
                                className='flex flex-col items-center gap-y-2'
                              >
                                <div className='flex flex-col items-center'>
                                  <p className='text-xs mt-2 w-5'>
                                    {sheet.name}
                                  </p>
                                  <div
                                    className={`w-6 h-6 border-2 border-black flex justify-center items-center ${
                                      sheet.status
                                        ? 'bg-green-500'
                                        : sheet.isDisable
                                        ? 'bg-green-500'
                                        : 'bg-white'
                                    }`}
                                    onClick={() => changeSheetStatus(sheet.id)}
                                  >
                                    {sheet.status ? <FiCheck /> : ' '}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              })}
              {/* End Sheet */}
            </div>
            <div className='space-y-2 mt-60 mr-10'>
              {/* Sheet */}
              {total_row_sheet.map((row, index) => {
                if (index >= 7 && index < 15) {
                  return (
                    <div className='flex flex-col space-y-3'>
                      <div className='flex gap-x-2'>
                        {sheets
                          .slice((index - 7) * 40 + 10, (index - 7) * 40 + 20)
                          .map((sheet, index) => {
                            return (
                              <div
                                key={index}
                                className='flex flex-col items-center'
                              >
                                <div className='flex flex-col items-center'>
                                  <p className='w-5 text-xs mt-3'>
                                    {sheet.name}
                                  </p>
                                  <div
                                    className={`w-6 h-6 border-2 border-black flex justify-center items-center ${
                                      sheet.status
                                        ? 'bg-green-500'
                                        : sheet.isDisable
                                        ? 'bg-green-500'
                                        : 'bg-white'
                                    }`}
                                    onClick={() => changeSheetStatus(sheet.id)}
                                  >
                                    {sheet.status ? <FiCheck /> : ' '}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              })}
              {/* End Sheet */}
            </div>
            <div className='space-y-2 mt-44 '>
              {/* Sheet */}
              {total_row_sheet.map((row, index) => {
                if (index >= 15 && index < 22) {
                  return (
                    <div className='flex flex-col space-y-2'>
                      <div className='flex gap-x-2'>
                        {sheets
                          .slice((index - 15) * 40 + 20, (index - 15) * 40 + 30)
                          .map((sheet, index) => {
                            return (
                              <div
                                key={index}
                                className='flex flex-col items-center'
                              >
                                <div className='flex flex-col items-center'>
                                  <p className='w-5 text-xs mt-3'>
                                    {sheet.name}
                                  </p>
                                  <div
                                    className={`w-6 h-6 border-2 border-black flex justify-center items-center ${
                                      sheet.status
                                        ? 'bg-green-500'
                                        : sheet.isDisable
                                        ? 'bg-green-500'
                                        : 'bg-white'
                                    }`}
                                    onClick={() => changeSheetStatus(sheet.id)}
                                  >
                                    {sheet.status ? <FiCheck /> : ' '}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              })}
              {/* End Sheet */}
            </div>
            <div className='space-y-3 -translate-y-10'>
              {/* Sheet */}
              {total_row_sheet.map((row, index) => {
                if (index >= 23 && index < 30) {
                  return (
                    <div className='flex flex-col space-y-3 ml-5'>
                      <div className='flex gap-x-3 -rotate-45'>
                        {sheets
                          .slice((index - 23) * 40 + 30, (index - 23) * 40 + 40)
                          .map((sheet, index) => {
                            return (
                              <div
                                key={index}
                                className='flex flex-col items-center gap-y-2'
                              >
                                <div className='flex flex-col items-center'>
                                  <p className='text-xs mt-2 w-5'>
                                    {sheet.name}
                                  </p>
                                  <div
                                    className={`w-6 h-6 border-2 border-black flex justify-center items-center ${
                                      sheet.status
                                        ? 'bg-green-500'
                                        : sheet.isDisable
                                        ? 'bg-green-500'
                                        : 'bg-white'
                                    }`}
                                    onClick={() => changeSheetStatus(sheet.id)}
                                  >
                                    {sheet.status ? <FiCheck /> : ' '}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              })}
              {/* End Sheet */}
            </div>
            {/* Kolom*/}
          </div>
        </div>
      </div>
    </DashboardAdminShell>
  );
}
