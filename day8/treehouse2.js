const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

// Currently left and up movement is wrong as going upwards we need
// to start from cell {row, col}

/**
 *
 * @param {Array<string>} inputList
 * @param {Number} row
 * @param {Number} col
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} treeHeight
 * @param {Boolean} isCol
 * @param {Number} direction
 */
const numberOfTreesVisible = (
  inputList,
  row,
  col,
  rows,
  cols,
  treeHeight,
  isCol
) => {
  let answer = 0;
  while (row <= rows && col <= cols) {
    answer += 1;
    if (inputList[row][col] >= treeHeight) break;
    if (isCol) col += 1;
    else row += 1;
  }

  return answer;
};

/**
 *
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  const rows = inputList.length;
  const cols = inputList[0].length;
  let answer = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const height = inputList[row][col];

      const left = numberOfTreesVisible(
        inputList,
        row,
        0,
        row,
        col - 1,
        height,
        true
      );
      const right = numberOfTreesVisible(
        inputList,
        row,
        col + 1,
        row,
        cols - 1,
        height,
        true
      );
      const top = numberOfTreesVisible(
        inputList,
        0,
        col,
        row - 1,
        col,
        height,
        false
      );
      const down = numberOfTreesVisible(
        inputList,
        row + 1,
        col,
        rows - 1,
        col,
        height,
        false
      );

      console.log({ left, right, top, down, row, col });
      answer = Math.max(answer, left * right * top * down);
    }
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
