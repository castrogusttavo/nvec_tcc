import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparationItemScreenPage } from './comparation-item-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ComparationItemScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparationItemScreenPageRoutingModule {}
