import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UpdateListPageRoutingModule } from './update-list-routing.module';
import { SharedModule } from 'src/components/shared/shared.module';
import { UpdateListPage } from './update-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    UpdateListPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateListPage]
})
export class UpdateListPageModule {}
