import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-list-square',
  templateUrl: './card-list-square.component.html',
  styleUrls: ['./card-list-square.component.scss'],
})
export class CardListSquareComponent  implements OnInit {

  @Input() imagePath: string | undefined;
  @Input() title: string | undefined;
  @Input() category: string | undefined;

  constructor() { }

  ngOnInit() {}

}
