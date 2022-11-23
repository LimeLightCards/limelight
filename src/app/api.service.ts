import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { IDeck } from '../../interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public get baseUrl() {
    return environment.api;
  }

  constructor(private http: HttpClient) { }

  // user
  public createUser() {
    return this.http.put(this.baseUrl + '/auth/user', {});
  }

  public updateUserDisplayName() {
    return this.http.put(this.baseUrl + '/auth/user/name', {});
  }

  public getUserById(userId: string) {
    return this.http.get(this.baseUrl + `/user/${userId}`).pipe(map((d: any) => d.user));
  }

  public getUserByFirebaseId(userId: string) {
    return this.http.get(this.baseUrl + `/user/firebase/${userId}`).pipe(map((d: any) => d.user));
  }

  // user collection
  public getCards() {
    return this.http.get(this.baseUrl + '/collection').pipe(map((d: any) => d.collection));
  }

  public resetCards() {
    return this.http.delete(this.baseUrl + '/collection');
  }

  public addCards(cards: Record<string, number>) {
    return this.http.post(this.baseUrl + '/collection/add-cards', { cards });
  }

  public removeCards(cards: Record<string, number>) {
    return this.http.post(this.baseUrl + '/collection/remove-cards', { cards });
  }

  public getDeckStatsForCard(cardId: string) {
    return this.http.get(this.baseUrl + `/deck/with/${encodeURIComponent(cardId)}`);
  }

  // deck collection
  public getDecks() {
    return this.http.get(this.baseUrl + '/deck/all').pipe(map((d: any) => d.decks));
  }

  public getDeckById(deckId: string) {
    return this.http.get(this.baseUrl + `/deck/${deckId}`).pipe(map((d: any) => d.deck));
  }

  public getMyDecks() {
    return this.http.get(this.baseUrl + '/deck/mine').pipe(map((d: any) => d.decks));
  }

  public remixDeck(parentDeck: string, parentRevision: string, deck: IDeck) {
    return this.http.put(this.baseUrl + `/deck/${parentDeck}/remix/${parentRevision}`, { deck }).pipe(map((d: any) => d.deck));
  }

  public createOrUpdateDeck(deck: IDeck) {
    return this.http.put(this.baseUrl + '/deck', { deck }).pipe(map((d: any) => d.deck));
  }

  public deleteDeck(deck: IDeck) {
    return this.http.delete(this.baseUrl + `/deck/${deck.id}/revise`).pipe(map((d: any) => d.deck));
  }

  public searchDecks(query: string, page = 0, sort = '', sortBy = '') {
    return this.http.get(this.baseUrl + `/deck/search?q=${encodeURIComponent(query)}&page=${page}&sort=${sort}&sortBy=${sortBy}`);
  }
}
