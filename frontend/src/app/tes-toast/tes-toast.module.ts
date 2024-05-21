import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TesToastPageRoutingModule } from './tes-toast-routing.module';

import { TesToastPage } from './tes-toast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesToastPageRoutingModule
  ],
  declarations: [TesToastPage]
})
export class TesToastPageModule {}
