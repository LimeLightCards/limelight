import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeckCreatePage } from './deck-create.page';

const routes: Routes = [
  {
    path: '',
    component: DeckCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckCreatePageRoutingModule {}
