const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

/**
 * @param {string} input
 */
const solve = (input, packetSize) => {
  const hashMap = new Map();
  const N = input.length;
  let start = 0;
  let end = 0;
  while (end < N) {
    const ch = input[end];
    if (hashMap.has(ch)) {
      // remove till the position where duplicate occured
      const pos = hashMap.get(ch);
      while (start <= pos) {
        const seenChar = input[start];
        const currFreq = hashMap.get(seenChar);
        hashMap.set(seenChar, currFreq - 1);
        start += 1;
      }
    }

    hashMap.set(ch, end);

    // if this is true then we have found 4 character unique pointer
    if (end - start + 1 === packetSize) {
      break;
    }
    end += 1;
  }

  return end + 1;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const input = await readInput(INPUT_PATH);
  console.log('Part1: ', solve(input, 4));
  console.log('Part2: ', solve(input, 14));
})();
