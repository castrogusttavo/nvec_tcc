import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-comparation-item',
  templateUrl: './card-comparation-item.component.html',
  styleUrls: ['./card-comparation-item.component.scss'],
})
export class CardComparationItemComponent  implements OnInit {

  @Input() priceItem:string | undefined
  @Input() itemCategory:string | undefined
  @Input() nameItem:string | undefined
  @Input() firstItemComparation:string | undefined
  @Input() secondItemComparation:string | undefined

  constructor() { }

  ngOnInit() {}

}
