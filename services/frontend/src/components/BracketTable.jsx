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

  const groupContainer = (groupName, state) => {
    let group;

    if (typeof(groupName) == "object") {
      group = groupName.name
    } else {
      group = groupName;
    }
    let round = `round${state.round}`

    let matchups = state.bracket[group][round];
    
    return <Group groupName={group} matchups={matchups} key={group} round={round} />
  }

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
              <>
                {groupContainer(group, state)}
              </>
            ))
          : Object.entries(state.bracket).map(([group, matchups], index) => (
            state.selectedGroup === group
              ? (
                <>
                  {groupContainer(group, state)}
                </>
              )
              : null))
      }
    </>
  );
}

export default BracketTable;
