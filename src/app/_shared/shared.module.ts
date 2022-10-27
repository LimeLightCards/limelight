import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { IonicModule } from '@ionic/angular';
import { BelowTheFoldComponent } from './components/below-the-fold/below-the-fold.component';


@NgModule({
  declarations: [
    CardDisplayComponent,
    BelowTheFoldComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardDisplayComponent,
    BelowTheFoldComponent
  ]
})
export class SharedModule { }
