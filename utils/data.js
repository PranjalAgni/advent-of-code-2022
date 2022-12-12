const fs = require('fs/promises');

const readInput = async (inputPath) => {
  const data = await fs.readFile(inputPath, 'utf-8');
  return data;
};

const convertInputToList = (data) => {
  if (!data || typeof data !== 'string') return [];
  return data.split('\n');
};

module.exports = {
  readInput,
  convertInputToList,
};
