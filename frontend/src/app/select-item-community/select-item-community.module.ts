import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectItemCommunityPageRoutingModule } from './select-item-community-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SelectItemCommunityPage } from './select-item-community.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectItemCommunityPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [SelectItemCommunityPage]
})
export class SelectItemCommunityPageModule {}
