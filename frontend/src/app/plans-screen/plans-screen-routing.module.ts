import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansScreenPage } from './plans-screen.page';

const routes: Routes = [
  {
    path: '',
    component: PlansScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansScreenPageRoutingModule {}
