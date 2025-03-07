/*eslint-disable*/
import React, { useContext } from 'react';
import GroupSelect from './GroupSelect';
import Group from './Group';
import { Context } from './BracketContext';

function BracketTable() {
  const value = useContext(Context);
  const [state] = value;
  const current_round = `round${state.round}`;
  
  return (
    <>
      <GroupSelect />
      {
        Object.entries(state.bracket[current_round]).map(([groupName, matchups]) => (
          <Group groupName={groupName} matchups={matchups} key={groupName} />
        ))
      }
    </>
  );
}

export default BracketTable;
