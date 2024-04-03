import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-comparation-item',
  templateUrl: './card-comparation-item.component.html',
  styleUrls: ['./card-comparation-item.component.scss'],
})
export class CardComparationItemComponent  implements OnInit {

  @Input() priceItem:string | undefined
  @Input() item:string | undefined
  @Input() nameItem:string | undefined

  constructor() { }

  ngOnInit() {}

}
