/* eslint-disable */

export const arrayHandler = (song1, arr) => {
  if (Array.isArray(arr)) {
    arr.push(song1);
  } else {
    arr = [song1];
  }
  // Remove undefined items from array
  arr = arr.filter((item) => item !== undefined);

  // Only return unique values
  return [...new Set(arr)];
};

export function findNestedObject(obj, key, value) {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      const result = findNestedObject(obj[k], key, value);
      if (result) {
        return result;
      }
    } else if (k === key && obj[k] === value) {
      return obj;
    }
  }
  return undefined;
}
