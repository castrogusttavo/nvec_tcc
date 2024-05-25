import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAdmCommunityPage } from './list-adm-community.page';

const routes: Routes = [
  {
    path: '',
    component: ListAdmCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdmCommunityPageRoutingModule {}
