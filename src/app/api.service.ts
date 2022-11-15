import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  // user collection
  public getCards() {
    return this.http.get(this.baseUrl + '/user/collection');
  }

  public resetCards() {
    return this.http.delete(this.baseUrl + '/user/collection');
  }

  public addCards(cards: Record<string, number>) {
    return this.http.post(this.baseUrl + '/user/collection/add-cards', { cards });
  }

  public removeCards(cards: Record<string, number>) {
    return this.http.post(this.baseUrl + '/user/collection/remove-cards', { cards });
  }
}
