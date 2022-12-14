const path = require('path');
const { readInput, convertInputToList } = require('../utils/data');

// rock paper sciss
// rock paper => paper
// rock sciss => rock
// paper sciss => sciss

// ABC RPS
// XYZ RPS

// player 1 is opponent player
const P1_SYMBOL_MAP = {
  A: 'R',
  B: 'P',
  C: 'S',
};

// player 2 is me
const P2_SYMBOL_MAP = {
  X: 'R',
  Y: 'P',
  Z: 'S',
};

const WIN_CHOICES_MAP = ['RP', 'SR', 'PS'];
const SYMBOLS = ['R', 'P', 'S'];
/*
 *
 * @param {string} player1Choice
 * @param {string} player2Choice
 */
const score = (player1Choice, player2Choice) => {
  // if it is the draw case
  if (player1Choice === player2Choice) return 3;
  const play = `${player1Choice}${player2Choice}`;
  return WIN_CHOICES_MAP.includes(play) ? 6 : 0;
};

/**
 *
 * @param {Array<string>} strategyData
 */
const solve = (strategyData) => {
  let answer = 0;
  for (const round of strategyData) {
    const [player1, player2] = round.split(' ');
    const roundScore = score(P1_SYMBOL_MAP[player1], P2_SYMBOL_MAP[player2]);
    const symbolIndex = SYMBOLS.indexOf(P2_SYMBOL_MAP[player2]) + 1;
    answer += roundScore + symbolIndex;
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const strategyData = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(strategyData));
})();
