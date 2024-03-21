import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadScreen1PageRoutingModule } from './load-screen1-routing.module';

import { LoadScreen1Page } from './load-screen1.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadScreen1PageRoutingModule,
    SharedModule
  ],
  declarations: [LoadScreen1Page]
})
export class LoadScreen1PageModule {}
