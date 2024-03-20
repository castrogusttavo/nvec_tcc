import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadScreen1Page } from './load-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: LoadScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadScreen1PageRoutingModule {}
