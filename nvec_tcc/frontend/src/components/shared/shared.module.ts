import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBigComponent } from './buttons/button-big/button-big.component';
import { ButtonMediumComponent } from './buttons/button-medium/button-medium.component';
import { ButtonMediumOutlineComponent } from './buttons/button-medium-outline/button-medium-outline.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CardBannerBlueComponent } from './cards/card-banner-blue/card-banner-blue.component';
import { CardBannerYellowComponent } from './cards/card-banner-yellow/card-banner-yellow.component';
import { CardItemComponent } from './cards/card-item/card-item.component';
import { CardListaLaranjaComponent } from './cards/card-listas-laranja/card-lista-laranja.component';
import { CardListasComponent } from './cards/card-listas-azul/card-listas.component';


@NgModule({
  declarations: [
    ButtonBigComponent,
    ButtonMediumComponent,
    ButtonMediumOutlineComponent,
    CardListasComponent,
    CardListaLaranjaComponent,
    CardItemComponent,
    CardBannerYellowComponent,
    CardBannerBlueComponent

  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{path: '../../../components/shared/cards/card-listas-azul', component: CardListasComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-listas-laranja', component: CardListaLaranjaComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-item', component: CardItemComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-banner-yellow', component: CardBannerYellowComponent}]),
    RouterModule.forChild([{path: '../../../components/shared/cards/card-banner-blue', component: CardBannerBlueComponent}])
    
  ],
  exports: [
    ButtonBigComponent,
    ButtonMediumComponent,
    ButtonMediumOutlineComponent,
    CardListasComponent,
    CommonModule,
    CardListaLaranjaComponent,
    CardItemComponent,
    CardBannerYellowComponent,
    CardBannerBlueComponent // Também exporte o CommonModule se você estiver usando diretivas do Angular como *ngFor ou *ngIf em seus componentes compartilhados
  ]
})
export class SharedModule { }