import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomcardPage } from './randomcard.page';

const routes: Routes = [
  {
    path: '',
    component: RandomcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomcardPageRoutingModule {}
