import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-item-community',
  templateUrl: './card-item-community.component.html',
  styleUrls: ['./card-item-community.component.scss'],
})
export class CardItemCommunityComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() routerLink!: string[];

  @Input() itemId!: number;
  @Input() listaId!: number;
  @Input() userId!: string;

  @Input() itemName: string | undefined;
  @Input() imagePath: string | undefined;



}
