import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { CreateComunnityPageRoutingModule } from './create-comunnity-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule

import { CreateComunnityPage } from './create-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateComunnityPageRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CreateComunnityPage]
})
export class CreateComunnityPageModule {}
