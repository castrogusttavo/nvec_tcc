import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ComparationItemScreenPageRoutingModule } from './comparation-item-screen-routing.module';

import { ComparationItemScreenPage } from './comparation-item-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComparationItemScreenPageRoutingModule
  ],
  declarations: [ComparationItemScreenPage]
})
export class ComparationItemScreenPageModule {}
