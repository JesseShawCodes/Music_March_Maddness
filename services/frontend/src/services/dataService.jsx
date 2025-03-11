function findObjectById(array, targetId) {
  return array.find((obj) => obj.matchupId === targetId);
}

export default findObjectById;
