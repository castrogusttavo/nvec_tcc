import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcountPageRoutingModule } from './acount-routing.module';

import { AcountPage } from './acount.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcountPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [AcountPage]
})
export class AcountPageModule {}
