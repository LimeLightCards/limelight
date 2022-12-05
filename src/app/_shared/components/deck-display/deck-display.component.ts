import { Component, Input, OnInit } from '@angular/core';
import { IDeck } from '../../../../../interfaces';

@Component({
  selector: 'app-deck-display',
  templateUrl: './deck-display.component.html',
  styleUrls: ['./deck-display.component.scss'],
})
export class DeckDisplayComponent implements OnInit {

  @Input() deck: IDeck;

  public firstCard: string;

  constructor() { }

  ngOnInit() {
    this.firstCard = Object.keys(this.deck.cards)[0];
  }

}
