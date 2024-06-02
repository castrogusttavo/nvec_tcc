import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadScreenCommunityTwoPageRoutingModule } from './load-screen-community-two-routing.module';

import { LoadScreenCommunityTwoPage } from './load-screen-community-two.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadScreenCommunityTwoPageRoutingModule,
    SharedModule
  ],
  declarations: [LoadScreenCommunityTwoPage]
})
export class LoadScreenCommunityTwoPageModule {}
