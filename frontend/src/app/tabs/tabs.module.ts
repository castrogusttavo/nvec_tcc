import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
