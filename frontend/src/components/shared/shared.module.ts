import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CardHomeCommunityComponent } from './cards/card-home-community/card-home-community.component';
import { CardUserCommunityComponent } from './cards/card-user-community/card-user-community.component';
import { CardListSquareComponent } from './cards/card-list-square/card-list-square.component';
import { ButtonArrowComponent } from './buttons/button-arrow/button-arrow.component';
import { CardListRecentComponent } from './cards/card-list-recent/card-list-recent.component';
import { CardBoxComponent } from './cards/card-box/card-box.component';
import { CardListSearchComponent } from './cards/card-list-search/card-list-search.component';
import { CardPlansComponent } from './cards/card-plans/card-plans.component';
import { SourchComponent } from './sourchs/sourch/sourch.component';
import { CardComparationItemComponent } from './cards/card-comparation-item/card-comparation-item.component';
import { CardListAllComponent } from './cards/card-list-all/card-list-all.component';
import { ModalItemComponent } from './modals/modal-item/modal-item.component';
//Mudar nome dos components abaixo quando tiver tempo
import { ModalCriarComponent } from './modals/modal-criar/modal-criar.component';
import { ExampleComponent } from './modals/example/example.component';
import { TypeaheadComponent } from './modals/typeahead/typeahead.component';

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
    CardListSearchComponent,
    CardHomeCommunityComponent,
    CardUserCommunityComponent,
    CardListSquareComponent,
    ButtonArrowComponent,
    CardListRecentComponent,
    CardBoxComponent,
    CardPlansComponent,
    ModalCriarComponent,
    CardComparationItemComponent,
    SourchComponent,
    CardListAllComponent,
    ExampleComponent,
    TypeaheadComponent,
    ModalItemComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '../../../components/shared/cards/card-item', component: CardItemComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-icon-home', component: CardIconHomeComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-banner', component: CardBannerComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list', component: CardListComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-search', component: CardListSearchComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-home-community', component: CardHomeCommunityComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-user-community', component: CardUserCommunityComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-square', component: CardListSquareComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-list-recent', component: CardListRecentComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-box', component: CardBoxComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-plans', component: CardPlansComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/modals/modal-criar-component', component: ModalCriarComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/modals/example', component: ExampleComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/modals/typeahead', component: TypeaheadComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/modals/modal-item', component: ModalItemComponent}]),
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
    CardListSearchComponent,
    CardHomeCommunityComponent,
    CardUserCommunityComponent,
    CardListSquareComponent,
    ButtonArrowComponent,
    CardListRecentComponent,
    CardBoxComponent,
    CardPlansComponent,
    ModalCriarComponent,
    CardComparationItemComponent,
    SourchComponent,
    CardListAllComponent,
    ExampleComponent,
    TypeaheadComponent,
    ModalItemComponent
  ]
})
export class SharedModule { }
