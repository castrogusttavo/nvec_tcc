import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrePagePage } from './pre-page.page';

const routes: Routes = [
  {
    path: '',
    component: PrePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrePagePageRoutingModule {}
