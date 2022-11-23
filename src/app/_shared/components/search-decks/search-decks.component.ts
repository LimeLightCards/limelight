import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { IDeck } from '../../../../../interfaces';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-search-decks',
  templateUrl: './search-decks.component.html',
  styleUrls: ['./search-decks.component.scss'],
})
export class SearchDecksComponent implements OnChanges {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  @Input() query = '';
  @Input() querySort: 'name'|'updatedAt' = 'updatedAt';
  @Input() querySortBy: 'asc'|'desc' = 'desc';
  @Input() page = 0;
  @Input() updateQueryParams = true;

  public isSearching = false;
  public queryDesc = '';

  public totalPages = 0;
  public visibleDecks: IDeck[] = [];

  public displayCurrent = 0;
  public displayTotal = 0;
  public displayMaximum = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnChanges(changes: any) {
    if(changes.query) {
      this.query = changes.query.currentValue;
    }

    if(changes.querySort) {
      this.querySort = changes.querySort.currentValue;
    }

    if(changes.querySortBy) {
      this.querySortBy = changes.querySortBy.currentValue;
    }

    if(changes.page) {
      this.page = changes.page.currentValue;
    }

    this.search(this.query, false);
    this.changePage(this.page);
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
      this.visibleDecks = [];
      this.updateParams();
      return;
    }

    this.queryDesc = 'decks';

    if(changePage) {
      this.changePage(0);
    }
  }

  updateParams() {
    if(!this.query || !this.updateQueryParams) {
      return;
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: {
      q: this.query,
      d: '',
      s: this.querySort,
      b: this.querySortBy,
      p: this.page
    }, queryParamsHandling: 'merge' });
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.isSearching = true;

    this.apiService.searchDecks(this.query, this.page, this.querySort, this.querySortBy).subscribe((d: any) => {
      this.isSearching = false;
      const { decks, pagination } = d;

      this.totalPages = pagination.totalPages - 1;

      if(this.page > this.totalPages) {
        this.page = this.totalPages;
      }

      if(this.page < 0) {
        this.page = 0;
      }

      this.visibleDecks = decks;
      this.displayCurrent = (this.page * pagination.pageSize) + 1;
      this.displayTotal = pagination.totalResults;
      this.displayMaximum = Math.min(pagination.totalResults, (this.page + 1) * pagination.pageSize);
    });

    this.updateParams();
  }

}
