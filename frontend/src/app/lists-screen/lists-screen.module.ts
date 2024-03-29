import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ListsScreenPageRoutingModule } from './lists-screen-routing.module';

import { ListsScreenPage } from './lists-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListsScreenPageRoutingModule
  ],
  declarations: [ListsScreenPage]
})
export class ListsScreenPageModule {}
