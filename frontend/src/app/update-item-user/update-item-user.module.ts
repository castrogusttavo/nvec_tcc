import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UpdateItemUserPageRoutingModule } from './update-item-user-routing.module';

import { UpdateItemUserPage } from './update-item-user.page';
import { SharedModule } from 'src/components/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemUserPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [UpdateItemUserPage]
})
export class UpdateItemUserPageModule {}
