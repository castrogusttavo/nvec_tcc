import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunnityListsItemPage } from './comunnity-lists-item.page';

const routes: Routes = [
  {
    path: '',
    component: ComunnityListsItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunnityListsItemPageRoutingModule {}
