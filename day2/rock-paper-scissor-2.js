const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

// rock paper sciss
// rock paper => paper
// rock sciss => rock
// paper sciss => sciss

// ABC RPS
// XYZ RPS

// player 1 is opponent player, player 2 is me
const P1_SYMBOL_MAP = {
  A: 'R',
  B: 'P',
  C: 'S',
};

const WIN_CHOICES_MAP = {
  R: 'P',
  S: 'R',
  P: 'S',
};

const LOOSE_CHOICES_MAP = {
  P: 'R',
  R: 'S',
  S: 'P',
};

const DRAW_CHOICES_MAP = {
  R: 'R',
  S: 'S',
  P: 'P',
};

// round results indication map
const END_RESULT_MAP = {
  X: [LOOSE_CHOICES_MAP, 0],
  Y: [DRAW_CHOICES_MAP, 3],
  Z: [WIN_CHOICES_MAP, 6],
};

const SYMBOLS = ['R', 'P', 'S'];

/**
 *
 * @param {Array<string>} strategyData
 */
const solve = (strategyData) => {
  let answer = 0;
  for (const round of strategyData) {
    const [player1, roundResult] = round.split(' ');
    const [resultMap, roundScore] = END_RESULT_MAP[roundResult];
    const symbolIndex = SYMBOLS.indexOf(resultMap[P1_SYMBOL_MAP[player1]]) + 1;
    answer += roundScore + symbolIndex;
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const strategyData = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(strategyData));
})();
