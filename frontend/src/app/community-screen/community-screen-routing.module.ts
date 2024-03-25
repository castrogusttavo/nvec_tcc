import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityScreenPage } from './community-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityScreenPageRoutingModule {}
