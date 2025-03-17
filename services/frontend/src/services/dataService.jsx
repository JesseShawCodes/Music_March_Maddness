/* eslint-disable */

export function findObjectById(array, targetId) {
  return array.roundMatchups.find((obj) => obj.matchupId === targetId);
}

export function generateNextRound(stateObject) {
  let currentRound = stateObject.round;
  let groupList = stateObject.bracket;

  let winnersGroup = {
    group1: [],
    group2: [],
    group3: [],
    group4: []
  }

  let nextRoundMatchups = {}
  
  for (const key in groupList) {
    if (groupList.hasOwnProperty(key)) {
      let matchups = groupList[key][`round${currentRound}`].roundMatchups;
      winnersGroup[`${key}`] = compileListOfWinners(matchups, key)
    }
  }

  for (const key in winnersGroup) {
    nextRoundMatchups[key] = getNextRoundMatchups(winnersGroup[key]);
  }

  return nextRoundMatchups;
}

function compileListOfWinners(matchups, groupName, winnersGroup = []) {
  for (let i = 0; i < matchups.length; i++) {
    typeof (matchups[i].attributes.winner) !== "undefined" ? winnersGroup.push(matchups[i].attributes.winner) : null;
  }
  return winnersGroup;
}

function getNextRoundMatchups(matchups) {
  let nextRound = [];
  for (let i = 0; i < matchups.length; i += 2) {
    let matchup = [matchups[i], matchups[i + 1]];
    nextRound.push(matchup);
  }
  return nextRound;
}