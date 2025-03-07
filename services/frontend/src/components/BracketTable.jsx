/* eslint-disable */
import React from 'react';

import Matchup from './Matchup';
import GroupSelect from './GroupSelect';
import Group from './Group';

function BracketTable({ bracket, selectSong, round }) {
  return (
    <>
      <GroupSelect />
      {
        Object.entries(bracket[round]).map(([groupName, matchups]) => (
          <Group groupName={groupName} matchups={matchups} selectSong={selectSong}/>
        ))
      }
    </>
  );
}

export default BracketTable;
