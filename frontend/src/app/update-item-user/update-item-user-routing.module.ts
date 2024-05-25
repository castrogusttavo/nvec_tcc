import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateItemUserPage } from './update-item-user.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateItemUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateItemUserPageRoutingModule {}
