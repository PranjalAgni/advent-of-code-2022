const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');
/**
 *
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  const rows = inputList.length;
  for (let row = 0; row < rows; row++) {
    const currentRow = inputList[row];
    console.log('Row: ', currentRow);
  }
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  solve(inputList);
})();
