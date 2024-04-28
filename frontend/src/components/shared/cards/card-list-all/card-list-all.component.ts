import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list-all',
  templateUrl: './card-list-all.component.html',
  styleUrls: ['./card-list-all.component.scss'],
})
export class CardListAllComponent  implements OnInit {

  @Input() limite:string | undefined
  @Input() nomeLista:string |undefined
  @Input() categoriaLista: string | undefined
  @Input() dataLista : string | undefined
  @Input() gasto : string | undefined

  constructor() { }

  ngOnInit() {}

}