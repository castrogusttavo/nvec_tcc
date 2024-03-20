import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-home-community',
  templateUrl: './card-home-community.component.html',
  styleUrls: ['./card-home-community.component.scss'],
})
export class CardHomeCommunityComponent  implements OnInit {

  @Input() title: string | undefined; // titulo modificavel
  @Input() content: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
