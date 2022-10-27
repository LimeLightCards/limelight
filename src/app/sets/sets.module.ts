import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetsPageRoutingModule } from './sets-routing.module';

import { SetsPage } from './sets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetsPageRoutingModule
  ],
  declarations: [SetsPage]
})
export class SetsPageModule {}
