const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

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

const findMaximumCalorie = (calorieList) => {
  const flatCalorieList = calorieList.map((calorieSegment) =>
    calorieSegment.reduce((accumulator, calorie) => {
      return accumulator + calorie;
    }, 0)
  );

  return Math.max(...flatCalorieList);
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  inputData.push('');
  const calorieList = parseCalorieList(inputData);
  const maxCalorie = findMaximumCalorie(calorieList);
  console.log('Max calorie ', maxCalorie);
})();
