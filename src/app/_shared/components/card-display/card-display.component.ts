import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../../../../../interfaces';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
})
export class CardDisplayComponent implements OnInit {

  @Input() card: ICard;
  @Input() display: 'images'|'text'|'checklist' = 'images';

  constructor() { }

  ngOnInit() {}

}
