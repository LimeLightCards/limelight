import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LuxonModule } from 'luxon-angular';

import { ProfilePublicPageRoutingModule } from './profile-public-routing.module';

import { ProfilePublicPage } from './profile-public.page';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LuxonModule,
    ProfilePublicPageRoutingModule
  ],
  declarations: [ProfilePublicPage]
})
export class ProfilePublicPageModule {}
