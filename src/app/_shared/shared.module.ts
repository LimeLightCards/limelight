import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { IonicModule } from '@ionic/angular';
import { BelowTheFoldComponent } from './components/below-the-fold/below-the-fold.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LuxonModule } from 'luxon-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CardIconComponent } from './components/cardicon/cardicon.component';
import { DeckDisplayComponent } from './components/deck-display/deck-display.component';
import { SearchCardsComponent } from './components/search-cards/search-cards.component';
import { SearchDecksComponent } from './components/search-decks/search-decks.component';
import { GravatarComponent } from './gravatar/gravatar.component';


@NgModule({
  declarations: [
    CardDisplayComponent,
    CardIconComponent,
    DeckDisplayComponent,
    BelowTheFoldComponent,
    TopbarComponent,
    SearchCardsComponent,
    SearchDecksComponent,
    GravatarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    LuxonModule,
    NgxDatatableModule,
  ],
  exports: [
    CardDisplayComponent,
    CardIconComponent,
    DeckDisplayComponent,
    BelowTheFoldComponent,
    TopbarComponent,
    SearchCardsComponent,
    SearchDecksComponent,
    GravatarComponent
  ]
})
export class SharedModule { }
