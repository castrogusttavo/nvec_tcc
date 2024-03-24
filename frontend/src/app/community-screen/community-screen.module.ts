import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { CommunityScreenPageRoutingModule } from './community-screen-routing.module';

import { CommunityScreenPage } from './community-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CommunityScreenPageRoutingModule
  ],
  declarations: [CommunityScreenPage]
})
export class CommunityScreenPageModule {}
