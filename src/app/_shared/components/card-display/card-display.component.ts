import { Component, Input, OnInit } from '@angular/core';
import { CardTrigger, ICard } from '../../../../../interfaces';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
})
export class CardDisplayComponent implements OnInit {

  @Input() size: 'normal'|'large' = 'normal';
  @Input() card: ICard;
  @Input() display: 'images'|'text' = 'images';

  public soulArray = [];

  constructor() { }

  ngOnInit() {
    this.soulArray = Array(this.card.soul).fill(CardTrigger.Soul);
  }

}
