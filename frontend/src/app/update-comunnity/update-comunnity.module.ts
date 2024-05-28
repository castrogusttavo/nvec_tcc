import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateComunnityPageRoutingModule } from './update-comunnity-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComunnityPage } from './update-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateComunnityPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [UpdateComunnityPage]
})
export class UpdateComunnityPageModule {}
