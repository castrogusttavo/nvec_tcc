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
import { CardListSmallComponent } from './cards/card-list-small/card-list-small.component';
import { CardHomeCommunityComponent } from './cards/card-home-community/card-home-community.component';
import { CardUserCommunityComponent } from './cards/card-user-community/card-user-community.component';
import { CardListSquareComponent } from './cards/card-list-square/card-list-square.component';
import { CardListRecentComponent } from './cards/card-list-recent/card-list-recent.component';
import { CardCreateComponent } from './cards/card-create/card-create.component';

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
    ButtonSocialComponent,
    CardListSmallComponent,
    CardHomeCommunityComponent,
    CardUserCommunityComponent,
    CardListSquareComponent,
    CardListRecentComponent,
    CardCreateComponent

  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{path: '../../../components/shared/cards/card-item', component: CardItemComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-icon-home', component: CardIconHomeComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-banner', component: CardBannerComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list', component: CardListComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-small', component: CardListSmallComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-home-community', component: CardHomeCommunityComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-user-community', component: CardUserCommunityComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-square', component: CardListSquareComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-recent', component: CardListRecentComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-create', component: CardCreateComponent}])

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
    ButtonSocialComponent,
    CardListSmallComponent,
    CardHomeCommunityComponent,
    CardUserCommunityComponent,
    CardListSquareComponent,
    CardListRecentComponent,
    CardCreateComponent
  ]
})
export class SharedModule { }