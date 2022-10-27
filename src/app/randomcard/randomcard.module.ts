import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomcardPageRoutingModule } from './randomcard-routing.module';

import { RandomcardPage } from './randomcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomcardPageRoutingModule
  ],
  declarations: [RandomcardPage]
})
export class RandomcardPageModule {}
