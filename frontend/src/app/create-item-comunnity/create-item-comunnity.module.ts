import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateItemComunnityPageRoutingModule } from './create-item-comunnity-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CreateItemComunnityPage } from './create-item-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateItemComunnityPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [CreateItemComunnityPage]
})
export class CreateItemComunnityPageModule {}
