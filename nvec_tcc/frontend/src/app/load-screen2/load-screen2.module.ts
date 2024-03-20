import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadScreen2PageRoutingModule } from './load-screen2-routing.module';

import { LoadScreen2Page } from './load-screen2.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadScreen2PageRoutingModule,
    SharedModule
  ],
  declarations: [LoadScreen2Page]
})
export class LoadScreen2PageModule {}
