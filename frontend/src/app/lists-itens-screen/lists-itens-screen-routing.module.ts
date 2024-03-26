import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsItensScreenPage } from './lists-itens-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ListsItensScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsItensScreenPageRoutingModule {}
