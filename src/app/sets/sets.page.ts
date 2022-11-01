import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { sortBy } from 'lodash';

import * as expansions from '../../assets/expansions.json';

const allExpansions = (expansions as any).default || expansions;

@Component({
  selector: 'app-sets',
  templateUrl: './sets.page.html',
  styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit {

  public sort: 'year'|'name' = 'name';
  public allYears: number[] = [];
  public allNames: string[] = [];

  get expansions() {
    return allExpansions;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.allYears = sortBy([...new Set(Object.values(allExpansions).map((expansion: any) => expansion.release).flat())]).reverse();
    this.allNames = sortBy(Object.keys(allExpansions), set => set.toLowerCase());
  }

  getSetReleaseDates(set: string): number[] {
    return allExpansions[set].release;
  }

  getSetsByYear(year: number): string[] {
    return Object.keys(allExpansions).filter(set => allExpansions[set].release.includes(year));
  }

  formatSetNameForSearch(setName: string): string {
    return `expansion:"${setName}"`;
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

}
