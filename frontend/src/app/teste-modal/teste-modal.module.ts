import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TesteModalPageRoutingModule } from './teste-modal-routing.module';
import { TesteModalPage } from './teste-modal.page';
import { SharedModule } from 'src/components/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesteModalPageRoutingModule,
    SharedModule
  ],
  declarations: [TesteModalPage]
})
export class TesteModalPageModule {}
