

import { ICard } from '../../interfaces';

export function bare(cards: ICard[], query: string, extraData = {}): ICard[] {

  const sQueries = query.toLowerCase().split(' ');

  const matches = (card: ICard, term: string) => {
    if(card.code.toLowerCase() === term) {
      return true;
    }

    if(card.expansion.toLowerCase().includes(term)) {
      return true;
    }

    if(card.name.toLowerCase().includes(term)) {
      return true;
    }

    if(card.ability.find(ability => ability.toLowerCase().includes(term))) {
      return true;
    }

    return false;
  };

  const foundCards = cards.filter(card => {
    const matchesAllSomewhere = sQueries.filter(sQuery => matches(card, sQuery));
    return matchesAllSomewhere.length === sQueries.length;
  });

  return foundCards;
}
