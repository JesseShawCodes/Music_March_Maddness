function findObjectById(array, targetId) {
  return array.roundMatchups.find((obj) => obj.matchupId === targetId);
}

export default findObjectById;
