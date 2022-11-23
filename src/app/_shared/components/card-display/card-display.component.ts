import { Component, Input, OnInit } from '@angular/core';
import { CardTrigger, ICard } from '../../../../../interfaces';
import { CardsService } from '../../../cards.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
})
export class CardDisplayComponent implements OnInit {

  @Input() size: 'grid'|'small'|'normal'|'large' = 'normal';
  @Input() cardCode: string;
  @Input() display: 'images'|'text' = 'images';
  @Input() climax = false;

  public card: ICard;
  public soulArray = [];

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.card = this.cardsService.getCardById(this.cardCode);
    this.soulArray = Array(this.card.soul).fill(CardTrigger.Soul);
  }

}
