import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectItemCommunityPage } from './select-item-community.page';

const routes: Routes = [
  {
    path: '',
    component: SelectItemCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectItemCommunityPageRoutingModule {}
