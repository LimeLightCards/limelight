
import * as parser from 'search-query-parser';
import { isString } from 'lodash';

import { ICard } from '../interfaces';

import { ability, attribute, bare, card, color, cost, expansion, inC, level,
  name, power, rarity, release, set, side, soul, tag, trigger, type } from './operators';

const allKeywords = [
  ['ability'],            // array search
  ['attribute',  'a'],    // array search
  ['id'],                 // exact text
  ['color',      'c'],    // exact text
  ['cost',       'co'],   // number search
  ['expansion',  'e'],    // loose text
  ['in'],                 // special operator
  ['level',      'l'],    // number search
  ['name',       'n'],    // loose text
  ['power',      'p'],    // number search
  ['rarity',     'r'],    // exact text
  ['release',    'rel'],  // exact text
  ['set'],                // exact text
  ['side'],               // exact text
  ['soul',       's'],    // number search
  ['tag'],                // array search
  ['type'],               // exact text
  ['trigger',    't']     // array search
];

const operators = [
  inC,

  ability,
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
  tag,
  trigger,
  type
];

export function properOperatorsInsteadOfAliases(result: parser.SearchParserResult): parser.SearchParserResult {
  allKeywords.forEach(keyword => {
    if(keyword.length === 1) {
      return;
    }

    keyword.slice(1).forEach(alias => {
      if(result[alias]) {
        result[keyword[0]] = result[alias];
        delete result[alias];
      }
      if(result.exclude[alias]) {
        result.exclude[keyword[0]] = result.exclude[alias];
        delete result.exclude[alias];
      }
    });
  });

  return result;
};

export function queryToText(query: string): string {
  query = query.toLowerCase().trim();

  const firstResult = parser.parse(query, { keywords: allKeywords.flat(), offsets: false }) as parser.SearchParserResult;
  if(isString(firstResult)) {
    return `cards with "${query}" in the name, abilities, expansion, or code`;
  }

  const result = properOperatorsInsteadOfAliases(firstResult);

  const text = [];

  if(result.ability) {
    const abilities = isString(result.ability) ? [result.ability] : result.ability;
    text.push(`ability has ${abilities.join(' or ')}`);
  }

  if(result.attribute) {
    const attributes = isString(result.attribute) ? [result.attribute] : result.attribute;
    text.push(`attribute is ${attributes.join(' or ')}`);
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
    const expansions = isString(result.expansion) ? [result.expansion] : result.expansion;
    text.push(`expansion is ${expansions.join(' or ')}`);
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
    const rarities = isString(result.rarity) ? [result.rarity] : result.rarity;
    text.push(`rarity is ${rarities.join(' or ')}`);
  }

  if(result.release) {
    const releases = isString(result.release) ? [result.release] : result.release;
    text.push(`release is ${releases.join(' or ')}`);
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

  if(result.tag) {
    const tags = isString(result.tag) ? [result.tag] : result.tag;
    text.push(`tag is ${tags.join(' or ')}`);
  }

  if(result.type) {
    text.push(`type is ${result.type}`);
  }

  if(result.trigger) {
    const triggers = isString(result.trigger) ? [result.trigger] : result.trigger;
    text.push(`trigger is ${triggers.join(' or ')}`);
  }

  if(result.in) {
    text.push(`in ${result.in}`);
  }

  return `cards where ${text.join(' and ')}`;
}

export function parseQuery(cards: ICard[], query: string, extraData = {}): ICard[] {
  query = query.toLowerCase().trim();

  const result = parser.parse(query, { keywords: allKeywords.flat(), offsets: false });

  // the parser returns a string if there's nothing interesting to do, for some reason
  // so we have a bare words parser
  if(isString(result)) {
    return bare(cards, query, extraData);
  }

  const resultText = (result as parser.SearchParserResult).text as string;

  let returnCards = cards;

  if(resultText) {
    returnCards = bare(returnCards, resultText, extraData);
  }

  // check all the operators
  operators.forEach(operator => {
    returnCards = operator(returnCards, result as parser.SearchParserResult, extraData);
  });

  return returnCards;
}
