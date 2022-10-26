
const fs = require('fs-extra');
const { default: gitClone } = require('git-clone-repo');
const { compress } = require('compress-json');

gitClone('CCondeluci/WeissSchwarz-ENG-DB', { destination: 'cards' });

const files = fs.readdirSync('cards/DB');

const allCards = [];

files.forEach(file => {
  const cards = fs.readJsonSync(`cards/DB/${file}`);
  allCards.push(...cards);
});

fs.writeJsonSync('src/assets/cards.json', allCards);
fs.writeJsonSync('src/assets/cards.min.json', compress(allCards));

console.log(`Got ${allCards.length} cards!`);
