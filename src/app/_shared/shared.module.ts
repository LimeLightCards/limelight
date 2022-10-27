import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { IonicModule } from '@ionic/angular';
import { BelowTheFoldComponent } from './components/below-the-fold/below-the-fold.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardDisplayComponent,
    BelowTheFoldComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    CardDisplayComponent,
    BelowTheFoldComponent,
    TopbarComponent
  ]
})
export class SharedModule { }
