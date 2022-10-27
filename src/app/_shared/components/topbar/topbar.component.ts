import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

  @Input() query = '';
  @Output() type = new EventEmitter<string>();
  @Output() enter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

}