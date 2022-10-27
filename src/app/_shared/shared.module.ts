import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CardDisplayComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardDisplayComponent
  ]
})
export class SharedModule { }
