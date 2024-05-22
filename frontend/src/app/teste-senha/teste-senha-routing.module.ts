import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesteSenhaPage } from './teste-senha.page';

const routes: Routes = [
  {
    path: '',
    component: TesteSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesteSenhaPageRoutingModule {}
