const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');
/**
 * @param {Array<string>} crates
 */
const getTotalCrates = (crate) => {
  return +crate.at(-2);
};

/**
 * @param {Array<string>} crates
 * @param {Number} totalCrates
 */
const parseCratesInStacks = (crates, totalCrates) => {
  const crateStacks = Array.from({ length: totalCrates }, (_) => []);

  for (const crate of crates) {
    const N = crate.length;
    for (let idx = 1, pos = 0; idx < N - 1; idx += 4, pos++) {
      const data = crate[idx].trim();
      if (data.length !== 0) {
        const stack = crateStacks[pos];
        stack.push(data);
        crateStacks[pos] = stack;
      }
    }
  }
  return crateStacks;
};

/**
 * @param {Array<string>} instructions
 */
const parseInstructions = (instructions) => {
  const instructionsList = [];
  for (const instruction of instructions) {
    const sanatizedInstructions = instruction
      .replace(/move|from|to/g, '')
      .split(' ')
      .filter((elt) => elt.length > 0)
      .map((elt) => +elt);

    instructionsList.push({
      move: sanatizedInstructions.at(0),
      from: sanatizedInstructions.at(1),
      to: sanatizedInstructions.at(2),
    });
  }

  return instructionsList;
};
/**
 * @param {Array<string>} inputList
 */
const parseInput = (inputList) => {
  const N = inputList.length;
  const crates = [];
  let idx = 0;
  for (; idx < N; idx++) {
    if (inputList[idx] === '') break;
    crates.push(inputList[idx]);
  }
  return [crates, inputList.slice(idx + 1)];
};

/**
 * @param {Array<string>} inputList
 */
const solve = (inputList) => {
  const [crates, instructions] = parseInput(inputList);
  const totalCrates = getTotalCrates(crates.pop());
  const crateStacks = parseCratesInStacks(crates, totalCrates);
  const instructionsList = parseInstructions(instructions);

  for (const instruction of instructionsList) {
    const sourceStack = crateStacks.at(instruction.from - 1);
    const targetStack = crateStacks.at(instruction.to - 1);
    let numMoves = instruction.move;

    const supplyItems = [];
    while (sourceStack.length > 0 && numMoves-- > 0) {
      const top = sourceStack.shift();
      supplyItems.push(top);
    }

    supplyItems.reverse();
    for (const item of supplyItems) {
      targetStack.unshift(item);
    }

    // update the stack state in the list
    crateStacks[instruction.from - 1] = sourceStack;
    crateStacks[instruction.to - 1] = targetStack;
  }

  let answer = '';
  for (const stack of crateStacks) {
    const data = stack.shift() || '';
    if (data.length !== 0) {
      answer += data;
    }
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
