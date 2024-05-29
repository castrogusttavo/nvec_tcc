import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportCssPageRoutingModule } from './report-css-routing.module';

import { ReportCssPage } from './report-css.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportCssPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [ReportCssPage]
})
export class ReportCssPageModule {}
