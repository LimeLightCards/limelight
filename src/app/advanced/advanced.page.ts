import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.page.html',
  styleUrls: ['./advanced.page.scss'],
})
export class AdvancedPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

}
