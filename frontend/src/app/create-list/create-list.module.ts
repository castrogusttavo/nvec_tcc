import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { CreateListPageRoutingModule } from './create-list-routing.module';

import { CreateListPage } from './create-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateListPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [CreateListPage]
})
export class CreateListPageModule {}
