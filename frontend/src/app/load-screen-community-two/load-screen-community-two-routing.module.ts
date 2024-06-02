import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadScreenCommunityTwoPage } from './load-screen-community-two.page';

const routes: Routes = [
  {
    path: '',
    component: LoadScreenCommunityTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadScreenCommunityTwoPageRoutingModule {}
