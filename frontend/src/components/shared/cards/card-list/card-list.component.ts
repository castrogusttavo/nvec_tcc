import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent  implements OnInit {

  @Input() title:string | undefined
  @Input() vl_gasto: string | undefined; // Adicione a propriedade vl_gasto
  @Input() rd_lista: string | undefined; // Adicione a propriedade rd_lista
  @Input() category:string | undefined
  @Input() date:string | undefined
  @Input() colorClass: string | undefined;

  constructor() { }

  ngOnInit() {}

}
