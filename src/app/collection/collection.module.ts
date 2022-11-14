import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CollectionPageRoutingModule } from './collection-routing.module';

import { CollectionPage } from './collection.page';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxDatatableModule,
    CollectionPageRoutingModule
  ],
  declarations: [CollectionPage]
})
export class CollectionPageModule {}
