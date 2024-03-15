import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-banner-yellow',
  templateUrl: './card-banner-yellow.component.html',
  styleUrls: ['./card-banner-yellow.component.scss'],
})
export class CardBannerYellowComponent  implements OnInit {
  @Input() imagePath: string | undefined; 
  @Input() titulo: string | undefined; 
  @Input() conteudo: string | undefined; 
  constructor() { }

  ngOnInit() {}

}
