import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateComunnityPage } from './update-comunnity.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateComunnityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateComunnityPageRoutingModule {}
