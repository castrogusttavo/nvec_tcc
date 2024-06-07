import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateItemCommunityPage } from './update-item-community.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateItemCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateItemCommunityPageRoutingModule {}
