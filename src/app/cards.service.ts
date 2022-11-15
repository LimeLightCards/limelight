import { Injectable } from '@angular/core';

import { sample, sortBy } from 'lodash';
import { decompress } from 'compress-json';

import { parseQuery } from '../../search/search';
import { ICard } from '../../interfaces';
import { compare } from '../../compare/compare';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: ICard[];
  private cardsByName: Record<string, ICard> = {};
  private cardsByCode: Record<string, ICard> = {};

  private collection: Record<string, number> = {};

  public get cardCollection() {
    return this.collection;
  }

  constructor(private apiService: ApiService) { }

  public async init() {
    const cardData = await fetch('https://data.limelight.cards/cards.min.json');
    const realData = await cardData.json();

    const allCards = decompress(realData);
    this.setCards(allCards);

    this.apiService.getCards().subscribe((cards: Record<string, number>) => {
      this.addCardsToCollection(cards);
    });
  }

  private setCards(cards: ICard[]) {
    this.cards = cards;

    this.cards.forEach(card => {
      this.cardsByName[card.name] = card;
      this.cardsByCode[card.code] = card;
    });
  }

  public getCardByCodeOrName(codeOrName: string): ICard | undefined {
    return this.cardsByCode[codeOrName] ?? this.cardsByName[codeOrName] ?? undefined;
  }

  public searchCards(query: string): ICard[] {
    return parseQuery(this.cards, query, { collection: this.cardCollection });
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

  public addCardsToCollection(cards: Record<string, number>) {
    Object.keys(cards).forEach(cardId => {
      if(!this.collection[cardId]) {
        this.collection[cardId] = 0;
      }

      this.collection[cardId] += cards[cardId];
    });
  }

  public removeCardFromCollection(cardCode: string): void {
    delete this.collection[cardCode];
  }

  public getQuantityOwned(cardCode: string): number {
    return this.collection[cardCode] ?? 0;
  }
}
