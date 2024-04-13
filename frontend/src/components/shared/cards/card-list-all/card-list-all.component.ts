import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list-all',
  templateUrl: './card-list-all.component.html',
  styleUrls: ['./card-list-all.component.scss'],
})
export class CardListAllComponent  implements OnInit {

  @Input() imagePath:string | undefined
  @Input() listName:string |undefined
  @Input() listCategory: string | undefined
  @Input() listTotal : string | undefined
  @Input() listDate : string | undefined

  constructor() { }

  ngOnInit() {}

}
