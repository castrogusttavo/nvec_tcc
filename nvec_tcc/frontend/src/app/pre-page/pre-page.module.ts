import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePagePageRoutingModule } from './pre-page-routing.module';

import { PrePagePage } from './pre-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePagePageRoutingModule
  ],
  declarations: [PrePagePage]
})
export class PrePagePageModule {}
