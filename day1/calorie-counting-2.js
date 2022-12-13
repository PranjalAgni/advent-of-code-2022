const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

const shiftElementRight = (sortedList, startIdx, endIdx) => {
  for (let idx = endIdx; idx > startIdx; idx--) {
    sortedList[idx] = sortedList[idx - 1];
  }
};

/**
 * @param {Array<number>} array
 */
const threeNumberSort = (array) => {
  let sortedList = [0, 0, 0];
  for (const elt of array) {
    if (elt > sortedList[0]) {
      shiftElementRight(sortedList, 0, 2);
      sortedList[0] = elt;
    } else if (elt > sortedList[1]) {
      shiftElementRight(sortedList, 1, 2);
      sortedList[1] = elt;
    } else {
      sortedList[2] = Math.max(sortedList[2], elt);
    }
  }

  return sortedList;
};

const parseCalorieList = (inputData) => {
  let currentSegment = [];
  return inputData.reduce((accumulator, currentCalorie) => {
    if (currentCalorie === '') {
      accumulator.push(currentSegment);
      currentSegment = [];
    } else {
      currentSegment.push(parseInt(currentCalorie));
    }
    return accumulator;
  }, []);
};

const sum = (list) =>
  list.reduce((accumulator, elt) => {
    return accumulator + elt;
  }, 0);

const findMaximumCalorie = (calorieList) => {
  const flatCalorieList = calorieList.map((calorieSegment) =>
    sum(calorieSegment)
  );

  const topThreeCalories = threeNumberSort(flatCalorieList);
  return sum(topThreeCalories);
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  inputData.push('');
  const calorieList = parseCalorieList(inputData);
  const maxCalorie = findMaximumCalorie(calorieList);
  console.log('Max calorie ', maxCalorie);
})();
