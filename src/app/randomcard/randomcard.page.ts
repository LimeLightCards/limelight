import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-randomcard',
  templateUrl: './randomcard.page.html',
  styleUrls: ['./randomcard.page.scss'],
})
export class RandomcardPage {

  constructor(
    private router: Router,
    private cardsService: CardsService
  ) { }

  ionViewDidEnter() {
    const card = this.cardsService.getRandomCard();
    this.router.navigate(['/card', card.code]);
  }

}
