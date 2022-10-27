
import * as parser from 'search-query-parser';
import { isString } from 'lodash';

import { ICard } from '../interfaces';

import { bare, card, color, expansion, rarity, set, side, type } from './operators';

const allKeywords = [
  'attribute',  'a',
  'id',                 // exact text
  'color',      'c',    // exact text
  'cost',       'co',
  'expansion',  'e',    // loose text
  'level',      'l',
  'name',       'n',
  'power',      'p',
  'rarity',     'r',    // exact text
  'release',    'rel',
  'set',                // exact text
  'side',               // exact text
  'soul',       's',
  'type',               // exact text
  'trigger',    't'
];

const operators = [
  card,
  color,
  expansion,
  rarity,
  set,
  side,
  type
];

export function parseQuery(cards: ICard[], query: string): ICard[] {
  const result = parser.parse(query, { keywords: allKeywords, offsets: false });

  // the parser returns a string if there's nothing interesting to do, for some reason
  // so we have a bare words parser
  if(isString(result)) {
    return bare(cards, query);
  }

  const resultText = (result as parser.SearchParserResult).text as string;

  let returnCards = cards;

  if(resultText) {
    returnCards = bare(returnCards, resultText);
  }

  // check all the operators
  operators.forEach(operator => {
    returnCards = operator(returnCards, result as parser.SearchParserResult);
  });

  return returnCards;
}
