import { Component, OnInit, Input } from '@angular/core'; //nescessario importar input
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-banner',
  templateUrl: './card-banner.component.html',
  styleUrls: ['./card-banner.component.scss'],
})
export class CardBannerComponent  implements OnInit {

  @Input() imagePath: string | undefined; // imagem modificavel
  @Input() titulo: string | undefined; // titulo modificavel
  @Input() conteudo: string | undefined;  // conteudo modificavel
  constructor() { }

  ngOnInit() {}

}
