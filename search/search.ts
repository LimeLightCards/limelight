
import * as parser from 'search-query-parser';
import { isString } from 'lodash';

import { ICard } from '../interfaces';

import { attribute, bare, card, color, expansion, name, rarity, set, side, trigger, type } from './operators';

const allKeywords = [
  'attribute',  'a',    // array search
  'id',                 // exact text
  'color',      'c',    // exact text
  'cost',       'co',
  'expansion',  'e',    // loose text
  'level',      'l',
  'name',       'n',    // loose text
  'power',      'p',
  'rarity',     'r',    // exact text
  'release',    'rel',
  'set',                // exact text
  'side',               // exact text
  'soul',       's',
  'type',               // exact text
  'trigger',    't'     // array search
];

const operators = [
  attribute,
  card,
  color,
  expansion,
  name,
  rarity,
  set,
  side,
  trigger,
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
