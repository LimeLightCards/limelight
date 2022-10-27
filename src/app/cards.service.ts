import { Injectable } from '@angular/core';

import { sample } from 'lodash';
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

  public getCardById(id: string): ICard | undefined {
    return this.cards.find(c => c.code === id);
  }

  public getRandomCard(): ICard {
    return sample(this.cards);
  }
}
