import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityListsSobrePage } from './community-lists-sobre.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityListsSobrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityListsSobrePageRoutingModule {}
