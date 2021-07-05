import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext({
  nlc: null,
  npc: null,
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
