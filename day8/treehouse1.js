const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');
/**
 *
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  console.log(inputList);
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  solve(inputList);
})();
