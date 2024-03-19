import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBigComponent } from './buttons/button-big/button-big.component';
import { ButtonMediumComponent } from './buttons/button-medium/button-medium.component';
import { ButtonMediumOutlineComponent } from './buttons/button-medium-outline/button-medium-outline.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CardItemComponent } from './cards/card-item/card-item.component';
import { CardIconHomeComponent } from './cards/card-icon-home/card-icon-home.component';
import { InputComponent } from './inputs/input/input.component';
import { CardBannerComponent } from './cards/card-banner/card-banner.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { ButtonSmallComponent } from './buttons/button-small/button-small.component';
import { ButtonSocialComponent } from './buttons/button-social/button-social.component';

@NgModule({
  declarations: [
    ButtonBigComponent,
    ButtonMediumComponent,
    ButtonMediumOutlineComponent,
    CardItemComponent,
    CardIconHomeComponent,
    InputComponent,
    CardBannerComponent,
    CardIconHomeComponent,
    CardListComponent,
    ButtonSmallComponent,
    ButtonSocialComponent

  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{path: '../../../components/shared/cards/card-item', component: CardItemComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-icon-home', component: CardIconHomeComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-banner', component: CardBannerComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list', component: CardListComponent}])
    
  ],
  exports: [
    ButtonBigComponent,
    ButtonMediumComponent,
    ButtonMediumOutlineComponent,
    CommonModule,
    CardItemComponent, // Também exporte o CommonModule se você estiver usando diretivas do Angular como *ngFor ou *ngIf em seus componentes compartilhados
    CardIconHomeComponent,
    InputComponent,
    CardBannerComponent,
    CardIconHomeComponent,
    CardListComponent,
    ButtonSmallComponent,
    ButtonSocialComponent
  ]
})
export class SharedModule { }