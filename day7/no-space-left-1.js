const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');
const { Filesystem, Disk } = require('./filesystem');
/**
 *
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  const fs = new Filesystem(inputList);
  const disk = new Disk(fs);
  const totalSize = disk.getDirectoryHavingSize(100_000);
  return totalSize;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log('Part1', solve(inputList));
})();
