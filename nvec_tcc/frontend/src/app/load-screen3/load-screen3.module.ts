import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadScreen3PageRoutingModule } from './load-screen3-routing.module';

import { LoadScreen3Page } from './load-screen3.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadScreen3PageRoutingModule,
    SharedModule
  ],
  declarations: [LoadScreen3Page]
})
export class LoadScreen3PageModule {}
