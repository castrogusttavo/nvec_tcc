import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsScreenPage } from './lists-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ListsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsScreenPageRoutingModule {}
