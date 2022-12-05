import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { DeckCreatePageRoutingModule } from './deck-create-routing.module';

import { DeckCreatePage } from './deck-create.page';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    SharedModule,
    DeckCreatePageRoutingModule
  ],
  declarations: [DeckCreatePage]
})
export class DeckCreatePageModule {}
