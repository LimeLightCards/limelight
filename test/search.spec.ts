import { parseQuery } from '../search/search';

import * as cards from '../src/assets/cards.json';

const allCards = (cards as any).default || cards;

test('Searching for a card by id should return that card', () => {
  const res = parseQuery(allCards, '5HY/W83-E001');
  expect(res.length).toBe(1);
  expect(res[0].code).toBe('5HY/W83-E001');

  const res2 = parseQuery(allCards, 'id:5HY/W83-E001');
  expect(res2.length).toBe(1);
  expect(res2[0].code).toBe('5HY/W83-E001');
});

test('Searching for multiple cards by id should return those cards', () => {
  const res = parseQuery(allCards, 'id:5HY/W83-E001,5HY/W83-E002');
  expect(res.length).toBe(2);
  expect(res.find(c => c.code === '5HY/W83-E001')).toBeTruthy();
  expect(res.find(c => c.code === '5HY/W83-E002')).toBeTruthy();
});

test('Excluding a card by id should ignore that card', () => {
  const res3 = parseQuery(allCards, '-id:5HY/W83-E001');
  expect(res3.length).toBe(allCards.length - 1);
  expect(res3.filter(c => c.code === '5HY/W83-E001').length).toBe(0);
});

test('Searching for a card by id (lowercase) should return that card correctly', () => {
  const res = parseQuery(allCards, '5hy/w83-e001');
  expect(res.length).toBe(1);
  expect(res[0].code).toBe('5HY/W83-E001');

  const res2 = parseQuery(allCards, 'id:5hy/w83-e001');
  expect(res2.length).toBe(1);
  expect(res2[0].code).toBe('5HY/W83-E001');
});

test('Searching for multiple cards by id (lowercase) should return those cards', () => {
  const res = parseQuery(allCards, 'id:5hy/w83-e001,5hy/w83-e002');
  expect(res.length).toBe(2);
  expect(res.find(c => c.code === '5HY/W83-E001')).toBeTruthy();
  expect(res.find(c => c.code === '5HY/W83-E002')).toBeTruthy();
});

test('Excluding a card by id (lowercase) should ignore that card', () => {
  const res3 = parseQuery(allCards, '-id:5hy/w83-e001');
  expect(res3.length).toBe(allCards.length - 1);
  expect(res3.filter(c => c.code === '5HY/W83-E001').length).toBe(0);
});

test('Filtering cards by side should return cards of only that side', () => {
  const res = parseQuery(allCards, 'side:W');
  expect(res.every(c => c.side === 'W')).toBe(true);

  const res2 = parseQuery(allCards, '-side:W');
  expect(res2.every(c => c.side === 'S')).toBe(true);
});

test('Filtering cards by color should return cards of only that color', () => {
  const res = parseQuery(allCards, 'color:Y');
  expect(res.every(c => c.color === 'Y')).toBe(true);

  const res2 = parseQuery(allCards, '-color:Y');
  expect(res2.every(c => c.color !== 'Y')).toBe(true);

  const res3 = parseQuery(allCards, '-color:Y,G');
  expect(res3.every(c => ['R', 'B'].includes(c.color))).toBe(true);
});

test('Filtering cards by rarity should return cards of only that rarity', () => {
  const res = parseQuery(allCards, 'rarity:RR+');
  expect(res.every(c => c.rarity === 'RR+')).toBe(true);

  const res2 = parseQuery(allCards, '-rarity:R');
  expect(res2.every(c => c.rarity !== 'R')).toBe(true);
});

test('Filtering cards by set should return cards of only that set', () => {
  const res = parseQuery(allCards, 'set:5hy');
  expect(res.every(c => c.set === '5HY')).toBe(true);

  const res2 = parseQuery(allCards, '-set:5hy');
  expect(res2.every(c => c.set !== '5HY')).toBe(true);
});

test('Filtering cards by type should return cards of only that type', () => {
  const res = parseQuery(allCards, 'type:character');
  expect(res.every(c => c.type === 'Character')).toBe(true);

  const res2 = parseQuery(allCards, '-type:character');
  expect(res2.every(c => c.type !== 'Character')).toBe(true);
});

test('Filtering cards by multiple operators should filter correctly', () => {
  const res = parseQuery(allCards, 'type:character side:w');
  expect(res.every(c => c.type === 'Character' && c.side === 'W')).toBe(true);

  const res2 = parseQuery(allCards, '-type:character -side:w');
  expect(res2.every(c => c.type !== 'Character' && c.side !== 'W')).toBe(true);

  const res3 = parseQuery(allCards, '-type:character side:w');
  expect(res3.every(c => c.type !== 'Character' && c.side === 'W')).toBe(true);
});
