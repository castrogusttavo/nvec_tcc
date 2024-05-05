import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyAndCookiesPolicyPage } from './privacy-and-cookies-policy.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyAndCookiesPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyAndCookiesPolicyPageRoutingModule {}
