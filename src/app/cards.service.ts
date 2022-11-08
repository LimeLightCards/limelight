import { Injectable } from '@angular/core';

import { sample, sortBy } from 'lodash';
import { decompress } from 'compress-json';

import { parseQuery } from '../../search/search';
import { ICard } from '../../interfaces';
import { compare } from '../../compare/compare';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: ICard[];

  public async init() {
    const cardData = await fetch('https://data.limelight.cards/cards.min.json');
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

  public getAllUniqueAttributes(attribute: keyof ICard): string[] {
    return sortBy(Array.from(new Set(this.cards.map(c => c[attribute]).flat())), x => x.toString().toLowerCase()) as string[];
  }

  public getCardsLikeCard(card: ICard, numLike = -1): Array<{ card: ICard; score: number }> {
    const cardScores = sortBy(
      this.cards.map(c => ({ card: c, score: compare(card, c) })),
      'score'
    ).reverse();

    if(numLike > 0) {
      return cardScores.slice(1, numLike + 1);
    }

    return cardScores.slice(1);
  }
}
