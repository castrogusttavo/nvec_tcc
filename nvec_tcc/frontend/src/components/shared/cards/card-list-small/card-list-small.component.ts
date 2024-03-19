import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-list-small',
  templateUrl: './card-list-small.component.html',
  styleUrls: ['./card-list-small.component.scss'],
})
export class CardListSmallComponent  implements OnInit {

  @Input() imagePath: string | undefined; // imagem modificavel
  @Input() titulo: string | undefined; // titulo modificavel
  @Input() descricao: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
