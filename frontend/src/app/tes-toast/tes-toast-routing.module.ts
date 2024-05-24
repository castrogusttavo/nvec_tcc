import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesToastPage } from './tes-toast.page';

const routes: Routes = [
  {
    path: '',
    component: TesToastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesToastPageRoutingModule {}
