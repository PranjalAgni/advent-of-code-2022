const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

/**
 *
 * @param {Array<string>} inputList
 * @param {Number} row
 * @param {Number} col
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} treeHeight
 * @param {Boolean} isCol
 */
const checkIsTreeTallest = (
  inputList,
  row,
  col,
  rows,
  cols,
  treeHeight,
  isCol
) => {
  while (row <= rows && col <= cols) {
    if (inputList[row] >= treeHeight) return false;
    if (isCol) col += 1;
    else row += 1;
  }

  return true;
};

/**
 *
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  const rows = inputList.length;
  const cols = inputList[0].length;
  const treesOnEdges = cols * 2 + Math.max(rows - 2, 0) * 2;

  let answer = 0;

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      const height = inputList[row][col];
      const isVisible =
        checkIsTreeTallest(inputList, row, 0, row, col - 1, height, true) ||
        checkIsTreeTallest(
          inputList,
          row,
          col + 1,
          row,
          cols - 1,
          height,
          true
        ) ||
        checkIsTreeTallest(inputList, 0, col, row - 1, col, height, false) ||
        checkIsTreeTallest(
          inputList,
          row + 1,
          col,
          rows - 1,
          col,
          height,
          false
        );

      if (isVisible) answer += 1;
    }
  }

  return treesOnEdges + answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
