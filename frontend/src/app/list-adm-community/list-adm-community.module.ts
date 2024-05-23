import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAdmCommunityPageRoutingModule } from './list-adm-community-routing.module';

import { ListAdmCommunityPage } from './list-adm-community.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAdmCommunityPageRoutingModule,
    SharedModule
  ],
  declarations: [ListAdmCommunityPage]
})
export class ListAdmCommunityPageModule {}
