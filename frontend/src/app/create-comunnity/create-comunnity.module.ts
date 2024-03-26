import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateComunnityPageRoutingModule } from './create-comunnity-routing.module';

import { CreateComunnityPage } from './create-comunnity.page';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateComunnityPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateComunnityPage]
})
export class CreateComunnityPageModule {}
