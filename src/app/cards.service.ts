import { Injectable } from '@angular/core';

import { decompress } from 'compress-json';

import { parseQuery } from '../../search/search';
import { ICard } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: ICard[];

  public async init() {
    const cardData = await fetch('assets/cards.min.json');
    const realData = await cardData.json();

    const allCards = decompress(realData);
    this.cards = allCards;
  }

  public searchCards(query: string): ICard[] {
    return parseQuery(this.cards, query);
  }
}
