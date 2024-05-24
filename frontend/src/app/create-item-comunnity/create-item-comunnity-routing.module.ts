import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateItemComunnityPage } from './create-item-comunnity.page';

const routes: Routes = [
  {
    path: '',
    component: CreateItemComunnityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateItemComunnityPageRoutingModule {}
