import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyntaxPageRoutingModule } from './syntax-routing.module';

import { SyntaxPage } from './syntax.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyntaxPageRoutingModule
  ],
  declarations: [SyntaxPage]
})
export class SyntaxPageModule {}
