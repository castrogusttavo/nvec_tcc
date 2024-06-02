import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityListsSobrePageRoutingModule } from './community-lists-sobre-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommunityListsSobrePage } from './community-lists-sobre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityListsSobrePageRoutingModule,
    HttpClientModule
  ],
  declarations: [CommunityListsSobrePage]
})
export class CommunityListsSobrePageModule {}
