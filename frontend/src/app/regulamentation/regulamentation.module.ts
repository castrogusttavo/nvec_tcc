import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulamentationPageRoutingModule } from './regulamentation-routing.module';

import { RegulamentationPage } from './regulamentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegulamentationPageRoutingModule
  ],
  declarations: [RegulamentationPage]
})
export class RegulamentationPageModule {}
