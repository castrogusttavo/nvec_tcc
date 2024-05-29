import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadScreenCommunityPageRoutingModule } from './load-screen-community-routing.module';

import { LoadScreenCommunityPage } from './load-screen-community.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadScreenCommunityPageRoutingModule,
    SharedModule
  ],
  declarations: [LoadScreenCommunityPage]
})
export class LoadScreenCommunityPageModule {}
