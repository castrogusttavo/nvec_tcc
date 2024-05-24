import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TesteSenhaPageRoutingModule } from './teste-senha-routing.module';
import { TesteSenhaPage } from './teste-senha.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesteSenhaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TesteSenhaPage]
})
export class TesteSenhaPageModule {}
