const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

/**
 *
 * @param {Number} row
 * @param {Number} col
 * @param {Number} rows
 * @param {Number} cols
 */
const moveLeftOrTop = (row, col, rows, cols) => {
  return row >= rows && col >= cols;
};

/**
 *
 * @param {Number} row
 * @param {Number} col
 * @param {Number} rows
 * @param {Number} cols
 */
const moveRightOrDown = (row, col, rows, cols) => {
  return row <= rows && col <= cols;
};
/**
 *
 * @param {Array<string>} inputList
 * @param {Number} row
 * @param {Number} col
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} treeHeight
 * @param {Boolean} isCol
 * @param {Function} checkMoveFn
 * @param {String} direction
 */
const numberOfTreesVisible = (
  inputList,
  row,
  col,
  rows,
  cols,
  treeHeight,
  isCol,
  checkMoveFn,
  direction
) => {
  let answer = 0;
  while (checkMoveFn(row, col, rows, cols)) {
    answer += 1;
    if (inputList[row][col] >= treeHeight) break;
    if (isCol) {
      if (direction === 'left') col -= 1;
      else col += 1;
    } else {
      if (direction === 'up') row -= 1;
      else row += 1;
    }
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
        col - 1,
        row,
        0,
        height,
        true,
        moveLeftOrTop,
        'left'
      );
      const right = numberOfTreesVisible(
        inputList,
        row,
        col + 1,
        row,
        cols - 1,
        height,
        true,
        moveRightOrDown,
        'right'
      );
      const top = numberOfTreesVisible(
        inputList,
        row - 1,
        col,
        0,
        col,
        height,
        false,
        moveLeftOrTop,
        'up'
      );
      const down = numberOfTreesVisible(
        inputList,
        row + 1,
        col,
        rows - 1,
        col,
        height,
        false,
        moveRightOrDown,
        'down'
      );

      answer = Math.max(answer, left * right * top * down);
    }
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
