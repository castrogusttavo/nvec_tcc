import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/components/shared/shared.module';

import { ListsItensScreenPageRoutingModule } from './lists-itens-screen-routing.module';

import { ListsItensScreenPage } from './lists-itens-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsItensScreenPageRoutingModule,
    SharedModule
  ],
  declarations: [ListsItensScreenPage]
})
export class ListsItensScreenPageModule {}
