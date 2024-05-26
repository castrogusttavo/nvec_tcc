import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateListPage } from './update-list.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateListPageRoutingModule {}
