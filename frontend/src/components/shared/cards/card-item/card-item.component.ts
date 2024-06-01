import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent  implements OnInit {

  constructor() { }

  @Input() itemId!: number;
  @Input() listaId!: number;

  @Input() itemName:string|undefined
  @Input() description:string|undefined
  @Input() imagePath:string|undefined
  @Input() price:string|undefined

  @Input() status: boolean = false;; //vai receber o status atual do item
  @Output() statusChange = new EventEmitter<boolean>(); //ele vai receber a mudança do status

  onStatusChange(event: any) {
    this.statusChange.emit(event.detail.checked);  //ele vai mudar o valor do status quando ocheckbox for alterado
  }

  ngOnInit() {}

}
