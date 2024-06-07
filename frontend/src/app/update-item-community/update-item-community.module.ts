import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UpdateItemCommunityPageRoutingModule } from './update-item-community-routing.module';
import { SharedModule } from 'src/components/shared/shared.module';

import { UpdateItemCommunityPage } from './update-item-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemCommunityPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [UpdateItemCommunityPage]
})
export class UpdateItemCommunityPageModule {}
