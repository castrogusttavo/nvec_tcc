import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCssPage } from './report-css.page';

const routes: Routes = [
  {
    path: '',
    component: ReportCssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportCssPageRoutingModule {}
