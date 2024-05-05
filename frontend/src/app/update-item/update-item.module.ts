import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateItemPageRoutingModule } from './update-item-routing.module';

import { UpdateItemPage } from './update-item.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateItemPage]
})
export class UpdateItemPageModule {}
