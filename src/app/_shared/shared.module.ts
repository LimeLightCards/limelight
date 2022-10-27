import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { IonicModule } from '@ionic/angular';
import { BelowTheFoldComponent } from './components/below-the-fold/below-the-fold.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardIconComponent } from './components/cardicon/cardicon.component';


@NgModule({
  declarations: [
    CardDisplayComponent,
    CardIconComponent,
    BelowTheFoldComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    CardDisplayComponent,
    CardIconComponent,
    BelowTheFoldComponent,
    TopbarComponent
  ]
})
export class SharedModule { }
