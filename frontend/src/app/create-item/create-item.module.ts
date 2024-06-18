import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { CreateItemPageRoutingModule } from './create-item-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateItemPage } from './create-item.page';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateItemPageRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule ,

  ],
  declarations: [CreateItemPage]
})
export class CreateItemPageModule {}
