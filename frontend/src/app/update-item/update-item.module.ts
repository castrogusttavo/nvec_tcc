import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateItemPageRoutingModule } from './update-item-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UpdateItemPage } from './update-item.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [UpdateItemPage]
})
export class UpdateItemPageModule {}
