import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeckViewPage } from './deck-view.page';

const routes: Routes = [
  {
    path: '',
    component: DeckViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckViewPageRoutingModule {}
