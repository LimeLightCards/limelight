import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravatar',
  templateUrl: './gravatar.component.html',
  styleUrls: ['./gravatar.component.scss'],
})
export class GravatarComponent implements OnInit {

  @Input() emailHash: string;
  @Input() size = 40;
  @Input() circle = false;

  constructor() { }

  ngOnInit() {}

}
