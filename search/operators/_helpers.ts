
import { isArray } from 'lodash';
import type * as parser from 'search-query-parser';

import { ICard } from '../../interfaces';

// TODO: partial text for expansion
// TODO: array search

export function numericalOperator(aliases: string[], key: string) {
  return (cards: ICard[], results: parser.SearchParserResult) => {
  };
}

export function partialTextOperator(aliases: string[], key: string) {
  return (cards: ICard[], results: parser.SearchParserResult) => {

    // if we have no cards, short-circuit because we can't filter it anymore
    if(cards.length === 0) return [];

    // if this operator isn't present at all, we skip it
    const shouldFilterThisOperator = aliases.some(alias => results[alias] || results.exclude[alias]);
    if(!shouldFilterThisOperator) return cards;

    // map all of the aliases (the same alias is an OR)
    return aliases.map(alias => {

      // if we have an exclusion rule for the alias (-alias), we ignore those cards
      if(results.exclude[alias]) {
        const search = isArray(results.exclude[alias]) ? results.exclude[alias] : [results.exclude[alias]];
        const invalidItems = search.map(x => x.toLowerCase());
        return cards.filter(c => !invalidItems.includes(c[key].toLowerCase()));
      }

      // otherwise we treat it as inclusion, and get those cards
      if(results[alias]) {
        const search = isArray(results[alias]) ? results[alias] : [results[alias]];
        const validItems = search.map(x => x.toLowerCase());
        return cards.filter(c => validItems.includes(c[key].toLowerCase()));
      }

      // if we have no results for this alias, we return no cards
      return [];

    }).flat();
  };
}

// this operator works on exact text matching for a field
// most properties can use this sufficiently
// it still checks case-insensitively
export function exactTextOperator(aliases: string[], key: string) {
  return (cards: ICard[], results: parser.SearchParserResult) => {

    // if we have no cards, short-circuit because we can't filter it anymore
    if(cards.length === 0) return [];

    // if this operator isn't present at all, we skip it
    const shouldFilterThisOperator = aliases.some(alias => results[alias] || results.exclude[alias]);
    if(!shouldFilterThisOperator) return cards;

    // map all of the aliases (the same alias is an OR)
    return aliases.map(alias => {

      // if we have an exclusion rule for the alias (-alias), we ignore those cards
      if(results.exclude[alias]) {
        const search = isArray(results.exclude[alias]) ? results.exclude[alias] : [results.exclude[alias]];
        const invalidItems = search.map(x => x.toLowerCase());
        return cards.filter(c => !invalidItems.includes(c[key].toLowerCase()));
      }

      // otherwise we treat it as inclusion, and get those cards
      if(results[alias]) {
        const search = isArray(results[alias]) ? results[alias] : [results[alias]];
        const validItems = search.map(x => x.toLowerCase());
        return cards.filter(c => validItems.includes(c[key].toLowerCase()));
      }

      // if we have no results for this alias, we return no cards
      return [];

    }).flat();
  };
}
