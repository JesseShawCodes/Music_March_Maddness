/* eslint-disable */

export function findObjectById(array, targetId) {
  return array.roundMatchups.find((obj) => obj.matchupId === targetId);
}

export function generateNextRound(stateObject) {
  console.log(stateObject);
  let currentRound = stateObject.round;
  let newRound = stateObject.round + 1;
  let groupList = stateObject.bracket;
  
  for (const key in groupList) {
    if (groupList.hasOwnProperty(key)) {
      // console.log(groupList[key][`round${currentRound}`].roundMatchups);
      // console.log(getNextRoundMatchups(groupList[key][`round${currentRound}`].roundMatchups));
      let matchups = groupList[key][`round${currentRound}`].roundMatchups;
      compileListOfWinners(matchups)
    }
  }
}

function compileListOfWinners(matchups) {
  console.log(matchups);
  for (let i = 0; i < matchups.length; i++) {
    console.log(matchups[i].attributes.winner)
  }
  console.log("---------")
}

function getNextRoundMatchups(matchups) {
  return matchups.map(group => {
    let nextRound = [];
    for (let i = 0; i < group.length; i += 2) {
      let matchup = [group[i], group[i + 1]];
      console.log(matchup)
      nextRound.push(matchup);
    }
    return nextRound;
  })
}