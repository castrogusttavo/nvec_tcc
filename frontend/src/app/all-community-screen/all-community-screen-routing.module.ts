import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCommunityScreenPage } from './all-community-screen.page';

const routes: Routes = [
  {
    path: '',
    component: AllCommunityScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCommunityScreenPageRoutingModule {}
