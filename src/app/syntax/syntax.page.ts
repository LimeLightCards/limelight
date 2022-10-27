import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-syntax',
  templateUrl: './syntax.page.html',
  styleUrls: ['./syntax.page.scss'],
})
export class SyntaxPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

}
