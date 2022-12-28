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
  const possibleDirectory = disk.getDirectoryToDelete(300_000_00);
  const deletedDirectorySize = Math.min(
    ...possibleDirectory.map((dir) => dir.size)
  );
  return { totalSize, deletedDirectorySize };
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  const { totalSize, deletedDirectorySize } = solve(inputList);

  console.log('Part1', totalSize);
  console.log('Part2', deletedDirectorySize);
})();
