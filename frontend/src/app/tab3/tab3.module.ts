import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from 'src/components/shared/shared.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';

import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
// import { ExampleComponent } from 'src/components/shared/modals/example/example.component';
// import { TypeaheadComponent } from 'src/components/shared/modals/typeahead/typeahead.component';

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
  // declarations: [Tab3Page, ExampleComponent, TypeaheadComponent]
  declarations: [Tab3Page]

})
export class Tab3PageModule {}
