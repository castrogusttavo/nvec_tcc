import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/components/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { LoginAccountPageRoutingModule } from './login-account-routing.module';

import { LoginAccountPage } from './login-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAccountPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginAccountPage]
})
export class LoginAccountPageModule {}
