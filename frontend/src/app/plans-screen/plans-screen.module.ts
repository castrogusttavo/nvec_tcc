import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { PlansScreenPageRoutingModule } from './plans-screen-routing.module';

import { PlansScreenPage } from './plans-screen.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansScreenPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [PlansScreenPage]
})
export class PlansScreenPageModule {}
