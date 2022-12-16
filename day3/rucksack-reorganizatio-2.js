const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

/**
 * @param {string} ch
 */
const getPriorityValue = (ch) => {
  if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 96;
  return ch.charCodeAt(0) - 64 + 26;
};

/**
 *
 * @param {Array<string>} group
 */
const findCommonCharacters = (group) => {
  const [word1, word2, word3] = group;
  const hashSet = new Set(word1);
  let intersection = new Set([...word2].filter((ch) => hashSet.has(ch)));
  intersection = new Set([...word3].filter((ch) => intersection.has(ch)));
  return Array.from(intersection);
};

/**
 * @param {Array<Array<string>>} groupedList
 */
const solve = (groupedList) => {
  let answer = 0;
  for (const group of groupedList) {
    const commonCharacter = findCommonCharacters(group);
    answer += getPriorityValue(commonCharacter[0]);
  }

  return answer;
};

/**
 * @param {Array<string>} inputList
 */
const groupTriplets = (inputList) => {
  const groupedList = [];
  for (let idx = 0; idx < inputList.length; idx += 3) {
    const group = [inputList[idx], inputList[idx + 1], inputList[idx + 2]];
    groupedList.push(group);
  }

  return groupedList;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  const groupedList = groupTriplets(inputList);
  console.log(solve(groupedList));
})();
