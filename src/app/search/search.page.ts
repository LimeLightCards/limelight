import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from 'lodash';

import { ICard } from '../../../interfaces';
import { queryToText } from '../../../search/search';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  public query = '';
  public queryDesc = '';

  public queryDisplay: 'images'|'text' = 'images';
  public querySort: keyof ICard = 'name';
  public querySortBy: 'asc'|'desc' = 'asc';

  public readonly cardsPerPage = 60;
  public page = 0;
  public totalPages = 0;
  public queriedCards: ICard[] = [];
  public visibleCards: ICard[] = [];

  public displayCurrent = 0;
  public displayTotal = 0;
  public displayMaximum = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardsService: CardsService
  ) { }

  ionViewDidEnter() {
    this.query = this.route.snapshot.queryParamMap.get('q') || '';
    this.queryDisplay = this.route.snapshot.queryParamMap.get('d') as 'images'|'text' || 'images';
    this.querySort = this.route.snapshot.queryParamMap.get('s') as keyof ICard || 'name';
    this.querySortBy = this.route.snapshot.queryParamMap.get('b') as 'asc'|'desc' || 'asc';

    const page = parseInt(this.route.snapshot.queryParamMap.get('p') || '0', 10);
    this.search(this.query, false);
    this.changePage(page);
  }

  redoCurrentSearch() {
    this.search(this.query);
  }

  search(query: string, changePage = true) {
    this.query = query;
    this.page = 0;
    this.totalPages = 0;
    this.displayCurrent = 0;
    this.displayTotal = 0;
    this.displayMaximum = 0;

    if(!this.query) {
      this.queriedCards = [];
      this.visibleCards = [];
      this.updateParams();
      return;
    }

    this.queryDesc = queryToText(this.query);

    this.queriedCards = this.cardsService.searchCards(this.query);
    this.doExtraSorting();

    if(changePage) {
      this.changePage(0);
    }
  }

  updateParams() {
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      q: this.query,
      d: this.queryDisplay,
      s: this.querySort,
      b: this.querySortBy,
      p: this.page
    }, queryParamsHandling: 'merge' });
  }

  doExtraSorting() {
    this.queriedCards = sortBy(this.queriedCards, this.querySort);
    if(this.querySortBy === 'desc') {
      this.queriedCards = this.queriedCards.reverse();
    }
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.totalPages = Math.ceil(this.queriedCards.length / this.cardsPerPage) - 1;

    if(this.page > this.totalPages) {
      this.page = this.totalPages;
    }

    if(this.page < 0) {
      this.page = 0;
    }

    this.visibleCards = this.queriedCards.slice(this.page * this.cardsPerPage, (this.page + 1) * this.cardsPerPage);

    this.displayCurrent = this.page * this.cardsPerPage + 1;
    this.displayTotal = this.queriedCards.length;
    this.displayMaximum = Math.min(this.displayTotal, (this.page + 1) * this.cardsPerPage);

    this.updateParams();
  }

}
