import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityScreenPageRoutingModule } from './community-screen-routing.module';

import { CommunityScreenPage } from './community-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityScreenPageRoutingModule
  ],
  declarations: [CommunityScreenPage]
})
export class CommunityScreenPageModule {}
