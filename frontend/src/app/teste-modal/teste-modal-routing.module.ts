import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesteModalPage } from './teste-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TesteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesteModalPageRoutingModule {}
