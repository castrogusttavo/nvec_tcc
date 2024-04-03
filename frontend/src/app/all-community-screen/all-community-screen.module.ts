import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { AllCommunityScreenPageRoutingModule } from './all-community-screen-routing.module';

import { AllCommunityScreenPage } from './all-community-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllCommunityScreenPageRoutingModule
  ],
  declarations: [AllCommunityScreenPage]
})
export class AllCommunityScreenPageModule {}
