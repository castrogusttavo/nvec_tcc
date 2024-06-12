import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStaticItemPageRoutingModule } from './update-static-item-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UpdateStaticItemPage } from './update-static-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStaticItemPageRoutingModule,
    HttpClientModule
  ],
  declarations: [UpdateStaticItemPage]
})
export class UpdateStaticItemPageModule {}
