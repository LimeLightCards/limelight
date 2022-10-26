const fs = require('fs-extra');
const { default: gitClone } = require('git-clone-repo');
const { compress } = require('compress-json');

const { classify } = require('./helpers/card-classifier');

gitClone('CCondeluci/WeissSchwarz-ENG-DB', { destination: 'cards' });

const files = fs.readdirSync('cards/DB');

const allCards = [];

files.forEach(file => {
  const cards = fs.readJsonSync(`cards/DB/${file}`);
  allCards.push(...cards);
});

allCards.forEach(card => {
  card.flavorText = card.flavor_text;
  delete card.flavor_text;

  card.color = card.color.toUpperCase();

  card.level = +card.level;
  if(isNaN(card.level)) card.level = 0;
  if(card.level > 3) card.level = 3;

  card.cost = +card.cost;
  if(isNaN(card.cost)) card.cost = 0;

  card.power = +card.power;
  if(isNaN(card.power)) card.power = 0;
});

const formattedCards = allCards.map(card => classify(card));

fs.writeJsonSync('src/assets/cards.json', formattedCards);
fs.writeJsonSync('src/assets/cards.min.json', compress(formattedCards));

console.log(`Got ${formattedCards.length} cards!`);
