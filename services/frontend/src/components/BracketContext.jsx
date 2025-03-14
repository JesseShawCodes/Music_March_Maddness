/*eslint-disable*/
import { React, createContext, useReducer } from 'react';

export const Context = createContext();

export const initialState = {
  values: [],
  bracket: {},
  round: 1,
  currentRoundProgres: 0,
  selectedGroup: 'all',
  groups: [
    { id: 1, name: 'group1', progress: null },
    { id: 2, name: 'group2', progress: null },
    { id: 3, name: 'group3', progress: null },
    { id: 4, name: 'group4', progress: null },
  ],
};

export function bracketReducer(state, action) {
  switch (action.type) {
    case 'setValues': {
      return {
        ...state,
        values: action.payload.values,
      };
    }
    case 'setBracket':
      return {
        ...state,
        bracket: action.payload.bracket,
      };
    case 'setRound':
      return {
        ...state,
        round: action.payload.round,
      };
    case 'setCurrentRoundProgres':
      return {
        ...state,
        currentRoundProgres: action.payload.currentRoundProgres,
      };
    case 'setSelectedGroup':
      return {
        ...state,
        selectedGroup: action.payload.selectedGroup,
      };
    default:
      return state;
  }
}

function BracketContext({ children }) {
  const [state, dispatch] = useReducer(bracketReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export default BracketContext;
