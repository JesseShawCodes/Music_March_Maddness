import React, { useContext } from 'react';
import GroupSelect from './GroupSelect';
import Group from './Group';
import { Context } from './BracketContext';

function BracketTable() {
  const value = useContext(Context);
  const [state] = value;
  const currentRound = `round${state.round}`;

  const groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
    { id: 4, name: 'Group 4' },
  ];

  return (
    <>
      <GroupSelect groups={groups} />
      {
        state.selectedGroup === 'all'
          ? Object.entries(state.bracket[currentRound]).map(([groupName, matchups]) => (
            <Group groupName={groupName} matchups={matchups} key={groupName} />
          ))
          : groups.filter((group) => state.selectedGroup === 'all' || group.name === state.selectedGroup)
            .map((group) => (
              <Group
                groupName={group.name}
                matchups={state.bracket[currentRound][groups[group.id - 1].name]}
                key={group.id}
              />
            ))
      }
    </>
  );
}

export default BracketTable;
