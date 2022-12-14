const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

// rock paper sciss
// rock paper => paper
// rock sciss => rock
// paper sciss => sciss

// ABC RPS
// XYZ RPS

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log(inputData);
})();
