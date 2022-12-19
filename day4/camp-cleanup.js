const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

/**
 *
 * @param {Array<number>} range1
 * @param {Array<number>} range2
 */
const isRangeFullyContained = (range1, range2) => {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return start2 >= start1 && end2 <= end1;
};
/**
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  let answer = 0;
  for (const data of inputList) {
    const [segment1, segment2] = data.split(',');
    const range1 = segment1.split('-').map((elt) => parseInt(elt));
    const range2 = segment2.split('-').map((elt) => parseInt(elt));
    if (
      isRangeFullyContained(range1, range2) ||
      isRangeFullyContained(range2, range1)
    ) {
      answer += 1;
    }
  }
  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
