
import * as parser from 'search-query-parser';
import { isString } from 'lodash';

import { ICard } from '../interfaces';

import { attribute, bare, card, color, cost, expansion, level,
  name, power, rarity, release, set, side, soul, trigger, type } from './operators';

const allKeywords = [
  'attribute',  'a',    // array search
  'id',                 // exact text
  'color',      'c',    // exact text
  'cost',       'co',   // number search
  'expansion',  'e',    // loose text
  'level',      'l',    // number search
  'name',       'n',    // loose text
  'power',      'p',    // number search
  'rarity',     'r',    // exact text
  'release',    'rel',  // exact text
  'set',                // exact text
  'side',               // exact text
  'soul',       's',    // number search
  'type',               // exact text
  'trigger',    't'     // array search
];

const operators = [
  attribute,
  card,
  color,
  cost,
  expansion,
  level,
  name,
  power,
  rarity,
  release,
  set,
  side,
  soul,
  trigger,
  type
];

export function queryToText(query: string): string {
  const result = parser.parse(query, { keywords: allKeywords, offsets: false }) as parser.SearchParserResult;
  if(isString(result)) {
    return `cards with "${query}" in the name, abilities, expansion, or code`;
  }

  console.log(result);

  const text = [];

  if(result.attribute) {
    text.push(`attribute is ${result.attribute.join(' or ')}`);
  }

  if(result.id) {
    text.push(`id is ${result.card}`);
  }

  if(result.color) {
    text.push(`color is ${result.color.split('').join(' or ')}`);
  }

  if(result.cost) {
    text.push(`cost is ${result.cost}`);
  }

  if(result.expansion) {
    text.push(`expansion is ${result.expansion.join(' or ')}`);
  }

  if(result.level) {
    text.push(`level is ${result.level}`);
  }

  if(result.name) {
    text.push(`name is ${result.name}`);
  }

  if(result.power) {
    text.push(`power is ${result.power}`);
  }

  if(result.rarity) {
    text.push(`rarity is ${result.rarity.join(' or ')}`);
  }

  if(result.release) {
    text.push(`release is ${result.release.join(' or ')}`);
  }

  if(result.set) {
    text.push(`set is ${result.set}`);
  }

  if(result.side) {
    text.push(`side is ${result.side}`);
  }

  if(result.soul) {
    text.push(`soul is ${result.soul}`);
  }

  if(result.type) {
    text.push(`type is ${result.type}`);
  }

  return `cards where ${text.join(' and ')}`;
}

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
