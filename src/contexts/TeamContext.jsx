import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext({
  nlc: null,
  npc: null,
  nst: null,
});
StateContext.displayName = 'TeamState';

const DispatchContext = createContext(null);
DispatchContext.displayName = 'TeamDispatch';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'STORE_NLC':
      return {
        ...state,
        nlc: payload,
      };
    case 'STORE_NPC':
      return {
        ...state,
        npc: payload,
      };
    case 'STORE_NST':
      return {
        ...state,
        nst: payload,
      };
    case 'CLEAR':
      return {
        nlc: null,
        npc: null,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const TeamProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    nlc: null,
    npc: null,
  });

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useTeamState = () => useContext(StateContext);
export const useTeamDispatch = () => useContext(DispatchContext);

// Example NLC
const ExampleNLC = {
  id: 5,
  nama_tim: 'asedfasdf',
  asal_sekolah: 'asdfasdfasdf',
  kota: 'KABUPATEN ACEH TIMUR',
  provinsi: 'ACEH',
  region: 'SUMATRA',
  nama_ketua: 'bambosa',
  email_ketua: 'theodorusclarence@gmail.com',
  nomor_telpon: '+628123456721',
  nisn_ketua: 'sdfasd',
  alamat_ketua: 'asdfasdf',
  id_line_ketua: null,
  link_bukti_sah:
    'https://schematics-webkes-backend-dev.herokuapp.com/storage/npc_team_file/kartu_.ketua_teamNPC2.qsQoxY8u3I.jpg',
  anggota: [
    '{alamat: "asdfasdf", email: "theodorusclarence@gmai…}',
    '{alamat: "asdf", email: "a@a.com", id_line: null, l…}',
  ],
  tahapan: null,
  status_pembayaran: null,
  event: 'nlc',
  voucher: { kode_voucher: 'SCHEMATICS20', potongan_persen: 20.0 },
};
