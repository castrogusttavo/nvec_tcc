import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent  implements OnInit {

  constructor() { }

  @Input() itemName:string|undefined
  @Input() description:string|undefined
  @Input() imagePath:string|undefined
  @Input() price:string|undefined

  ngOnInit() {}

}
