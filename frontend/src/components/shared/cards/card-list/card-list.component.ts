import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent  implements OnInit {

  @Input() title:string | undefined
  @Input() price:string | undefined
  @Input() category:string | undefined
  @Input() date:string | undefined
  constructor() { }

  ngOnInit() {}

}
