/* eslint-disable */

import React, { useContext } from 'react';
import GroupSelect from './GroupSelect';
import Group from './Group';
import { Context } from './BracketContext';

function BracketTable() {
  const value = useContext(Context);
  const [state] = value;
  const currentRound = `round${state.round}`;
  const roundHeader = `Round ${state.round}`;

  return (
    <>
      <h2 className="my-3">
        {roundHeader}
      </h2>

      <GroupSelect groups={state.groups} />
      {
        state.selectedGroup === 'all'
          ? state.groups.filter((group) => state.selectedGroup === 'all' || group.name === state.selectedGroup)
            .map((group) => (
              <Group
                groupName={group.name}
                matchups={state.bracket[state.groups[group.id - 1].name][currentRound]}
                key={group.id}
              />
            ))
          : Object.entries(state.bracket).map(([groupName, matchups], index) => (
            state.selectedGroup === groupName
              ? (
                <Group
                  groupName={groupName}
                  matchups={matchups[currentRound]}
                  key={`Group ${state.groups[index].id}`}
                />
              )
              : null))
      }
    </>
  );
}

export default BracketTable;
