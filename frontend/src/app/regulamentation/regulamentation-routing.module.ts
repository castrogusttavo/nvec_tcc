import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegulamentationPage } from './regulamentation.page';

const routes: Routes = [
  {
    path: '',
    component: RegulamentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegulamentationPageRoutingModule {}
