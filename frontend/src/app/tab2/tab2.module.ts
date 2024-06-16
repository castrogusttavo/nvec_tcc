import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SharedModule } from 'src/components/shared/shared.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
