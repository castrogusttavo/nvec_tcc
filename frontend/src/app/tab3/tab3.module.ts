import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from 'src/components/shared/shared.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
