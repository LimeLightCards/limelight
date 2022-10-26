
const cards = require('../src/assets/cards.json');


const getUniqueValues = (key: string) => {
  const values = cards.map((card: any) => card[key]);
  return [...new Set(values)];
};

const getUniqueArrayValues = (key: string) => {
  const values = cards.map((card: any) => card[key]).flat();
  return [...new Set(values)];
};

console.log('Type', getUniqueValues('type'));
console.log('Color', getUniqueValues('color'));
console.log('Trigger', getUniqueArrayValues('trigger'));
console.log('Level', getUniqueValues('level'));
console.log('Cost', getUniqueValues('cost'));
console.log('Power', getUniqueValues('power'));
console.log('Soul', getUniqueValues('soul'));
console.log('Rarity', getUniqueValues('rarity'));
