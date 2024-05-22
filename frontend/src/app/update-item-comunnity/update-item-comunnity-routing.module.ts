import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateItemComunnityPage } from './update-item-comunnity.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateItemComunnityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateItemComunnityPageRoutingModule {}
