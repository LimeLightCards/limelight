import { ICard } from '../../interfaces';

export function bare(cards: ICard[], query: string, extraData = {}): ICard[] {

  const sQuery = query.toLowerCase();

  return cards.filter(card => {
    if(card.code.toLowerCase() === sQuery) {
      return true;
    }

    if(card.expansion.toLowerCase().includes(sQuery)) {
      return true;
    }

    if(card.name.toLowerCase().includes(sQuery)) {
      return true;
    }

    if(card.ability.find(ability => ability.toLowerCase().includes(sQuery))) {
      return true;
    }

    return false;
  });
}
