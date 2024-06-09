import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStaticItemPage } from './update-static-item.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStaticItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStaticItemPageRoutingModule {}
