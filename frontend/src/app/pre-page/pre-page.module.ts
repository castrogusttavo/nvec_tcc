import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePagePageRoutingModule } from './pre-page-routing.module';

import { PrePagePage } from './pre-page.page';

import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePagePageRoutingModule,
    SharedModule
  ],
  declarations: [PrePagePage]
})
export class PrePagePageModule {}
