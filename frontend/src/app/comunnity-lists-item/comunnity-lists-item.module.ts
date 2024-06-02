import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ComunnityListsItemPageRoutingModule } from './comunnity-lists-item-routing.module';

import { ComunnityListsItemPage } from './comunnity-lists-item.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunnityListsItemPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [ComunnityListsItemPage]
})
export class ComunnityListsItemPageModule {}
