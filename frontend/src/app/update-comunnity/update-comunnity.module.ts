import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateComunnityPageRoutingModule } from './update-comunnity-routing.module';

import { UpdateComunnityPage } from './update-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateComunnityPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComunnityPage]
})
export class UpdateComunnityPageModule {}
