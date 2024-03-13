import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CardListasComponent } from 'src/components/cards/card-listas/card-listas.component';
import { RouterModule } from '@angular/router';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ButtonBigComponent } from 'src/components/buttons/button-big/button-big.component';
import { ButtonMediumComponent } from 'src/components/buttons/button-medium/button-medium.component';
import { ButtonMediumOutlineComponent } from 'src/components/buttons/button-medium-outline/button-medium-outline.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule.forChild([{path: '../../../components/cards/card-listas', component: CardListasComponent}])
  ],
  declarations: [Tab1Page, CardListasComponent, ButtonBigComponent, ButtonMediumComponent, ButtonMediumOutlineComponent]
})
export class Tab1PageModule {}
