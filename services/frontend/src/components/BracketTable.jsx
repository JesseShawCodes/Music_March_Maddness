/* eslint-disable */
import React, { useContext } from 'react';
import GroupSelect from './GroupSelect';
import Group from './Group';
import FinalFour from './FinalFour';
import { Context } from './BracketContext';

function BracketTable() {
  const value = useContext(Context);
  const [state] = value;

  const roundHeader = state.finalFour ? 'Final Four' : `Round ${state.round}`;

  const groupsList = state.groups;

  const groupContainer = (groupName, stateContainer) => {
    let group;
    if (typeof (groupName) === 'object') {
      group = groupName.name;
    } else {
      group = groupName;
    }
    const round = `round${stateContainer.round}`;

    const matchups = stateContainer.bracket[group][round];

    return <Group groupName={group} matchups={matchups} key={group} round={round} />;
  };

  return (
    <>
      <h2 className="my-3">
        {roundHeader}
      </h2>

      {
        state.finalFour !== true ? <GroupSelect groups={state.groups} /> : null
      }
      {
        state.finalFour === true ? <FinalFour />
          : state.selectedGroup === 'all'
            ? groupsList.filter((group) => state.selectedGroup === 'all' || group.name === state.selectedGroup)
              .map((group) => (
                <>
                  {groupContainer(group, state)}
                </>
              ))
            : Object.entries(state.bracket).map(([group]) => (
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
