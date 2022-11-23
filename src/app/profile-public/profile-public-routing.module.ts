import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePublicPage } from './profile-public.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePublicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePublicPageRoutingModule {}
