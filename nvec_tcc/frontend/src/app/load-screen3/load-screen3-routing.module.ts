import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadScreen3Page } from './load-screen3.page';

const routes: Routes = [
  {
    path: '',
    component: LoadScreen3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadScreen3PageRoutingModule {}
