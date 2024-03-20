import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadScreen2Page } from './load-screen2.page';

const routes: Routes = [
  {
    path: '',
    component: LoadScreen2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadScreen2PageRoutingModule {}
