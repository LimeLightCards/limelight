import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-randomcard',
  templateUrl: './randomcard.page.html',
  styleUrls: ['./randomcard.page.scss'],
})
export class RandomcardPage implements OnInit {

  constructor(
    private router: Router,
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    const card = this.cardsService.getRandomCard();
    this.router.navigate(['/card', card.code]);
  }

}
