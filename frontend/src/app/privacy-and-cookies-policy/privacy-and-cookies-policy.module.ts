import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyAndCookiesPolicyPageRoutingModule } from './privacy-and-cookies-policy-routing.module';

import { PrivacyAndCookiesPolicyPage } from './privacy-and-cookies-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyAndCookiesPolicyPageRoutingModule
  ],
  declarations: [PrivacyAndCookiesPolicyPage]
})
export class PrivacyAndCookiesPolicyPageModule {}
