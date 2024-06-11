import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateItemComunnityPageRoutingModule } from './update-item-comunnity-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UpdateItemComunnityPage } from './update-item-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemComunnityPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [UpdateItemComunnityPage]
})
export class UpdateItemComunnityPageModule {}
