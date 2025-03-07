/*eslint-disable*/
import { createContext, useReducer } from 'react';

export const Context = createContext();

const initialState = {
  values: [],
  bracket: {},
  round: 1,
  nextRound: 2,
  selectedGroup: "group1"
};

function bracketReducer(state, action) {
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
    case 'setNextRound':
      return {
        ...state,
        nextRound: action.payload.nextRound,
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

const BracketContext = ({ children }) => {
  const [state, dispatch] = useReducer(bracketReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default BracketContext;
