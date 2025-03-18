/* eslint-disable */
export function findObjectById(array, targetId) {
  return array.roundMatchups.find((obj) => obj.matchupId === targetId);
}

function getNextRoundMatchups(songList, round) {
  const nextRound = [];
  for (let i = 0; i < songList.length; i += 2) {
    const matchup = {
      matchupId: `${songList[i].id}${songList[i + 1].id}`,
      round: round,
      attributes: {
        complete: false,
        song1: {
          song: songList[i],
          groupRank: songList[i].rank,
          winner: null,
        },
        song2: {
          song: songList[i + 1],
          groupRank: songList[i + 1].rank,
          winner: null,
        },
      },
    };
    nextRound.push(matchup);
  }
  return nextRound;
}

export function generateNextRound(stateObject) {
  const currentRound = stateObject.round;
  const groupList = stateObject.bracket;

  const winnersGroup = {
    group1: [],
    group2: [],
    group3: [],
    group4: [],
  };

  const nextRoundMatchups = {};

  for (const key in groupList) {
    if (groupList.hasOwnProperty(key)) {
      const matchups = groupList[key][`round${currentRound}`].roundMatchups;
      winnersGroup[`${key}`] = compileListOfWinners(matchups);
    }
  }

  if (stateObject.finalRoundWithGroups) {
    return getFinalFourMatchup(winnersGroup);
  }

  for (const key in winnersGroup) {
    nextRoundMatchups[key] = getNextRoundMatchups(winnersGroup[key], stateObject.round + 1);
  }

  return nextRoundMatchups;
}

function getFinalFourMatchup(finalFourSongs) {
  const fourSongs = [];
  for (const song in finalFourSongs) {
    fourSongs.push(finalFourSongs[song][0])
  }

  return getNextRoundMatchups(fourSongs);
}

function compileListOfWinners(matchups, winnersGroup = []) {
  for (let i = 0; i < matchups.length; i++) {
    typeof (matchups[i].attributes.winner) !== 'undefined' ? winnersGroup.push(matchups[i].attributes.winner) : null;
  }
  return winnersGroup;
}
