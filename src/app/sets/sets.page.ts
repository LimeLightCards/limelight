import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.page.html',
  styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

}
