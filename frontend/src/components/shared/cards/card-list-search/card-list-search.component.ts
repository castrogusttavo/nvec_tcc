import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-list-search',
  templateUrl: './card-list-search.component.html',
  styleUrls: ['./card-list-search.component.scss'],
})
export class CardListSearchComponent  implements OnInit {

  @Input() imagePath: string | undefined; // imagem modificavel
  @Input() title: string | undefined; // titulo modificavel
  @Input() description: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
