import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LuxonModule } from 'luxon-angular';

import { DeckViewPageRoutingModule } from './deck-view-routing.module';

import { DeckViewPage } from './deck-view.page';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LuxonModule,
    NgxDatatableModule,
    DeckViewPageRoutingModule
  ],
  declarations: [DeckViewPage]
})
export class DeckViewPageModule {}
