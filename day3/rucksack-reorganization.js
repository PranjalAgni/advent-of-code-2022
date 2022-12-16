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
 * @param {string} word1
 * @param {string} word2
 */
const findCommonCharacters = (word1, word2) => {
  const freqMap = new Map();
  for (const ch of word1) {
    freqMap.set(ch, true);
  }

  let commonCharacter = null;
  for (const ch of word2) {
    if (freqMap.has(ch)) {
      commonCharacter = ch;
      break;
    }
  }

  return commonCharacter;
};

/**
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  let answer = 0;
  for (const input of inputList) {
    const compartment1 = input.slice(0, input.length / 2);
    const compartment2 = input.slice(input.length / 2, input.length);
    const commonCharacter = findCommonCharacters(compartment1, compartment2);
    answer += getPriorityValue(commonCharacter);
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
