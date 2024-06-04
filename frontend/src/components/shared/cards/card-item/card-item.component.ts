import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() itemId!: number;
  @Input() listaId!: number;

  @Input() itemName: string | undefined;
  @Input() description: string | undefined;
  @Input() imagePath: string | undefined;
  @Input() price: string | undefined;

  @Input() status!: number;
  @Output() statusChange = new EventEmitter<boolean>();

  get isChecked(): boolean {
    return this.status === 2;
  }

  onStatusChange(event: any) {
    this.statusChange.emit(event.detail.checked);
  }

  ngOnInit() {}

}
