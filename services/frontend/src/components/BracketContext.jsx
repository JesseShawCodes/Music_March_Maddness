/* eslint-disable */
import { React, createContext, useReducer } from 'react';

export const Context = createContext();

export const initialState = {
  values: [],
  bracket: {},
  championshipBracket: {},
  round: 1,
  currentRoundProgres: 0,
  selectedGroup: 'all',
  nonGroupPlay: false,
  finalFour: false,
  finalTwo: false,
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
        currentRoundProgres: action.payload.currentRoundProgres === 1 ? '0' : action.payload.currentRoundProgres,
      };
    case 'setSelectedGroup':
      return {
        ...state,
        selectedGroup: action.payload.selectedGroup,
      };
    case 'setNonGroupPlay':
      return {
        ...state,
        nonGroupPlay: action.payload.nonGroupPlay,
      };
    case 'setFinalFour':
      return {
        ...state,
        finalFour: action.payload.finalFour,
      };
    case 'setFinalTwo':
      return {
        ...state,
        finalTwo: action.payload.finalTwo,
      };
    case 'setChampionshipBracket':
      return {
        ...state,
        championshipBracket: action.payload.championshipBracket,
      }
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
