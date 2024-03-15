import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-card-listas-azul',
  templateUrl: './card-listas.component.html',
  styleUrls: ['./card-listas.component.scss'],
})
export class CardListasComponent implements OnInit {

  @Input() cardColor: string | undefined;

  constructor() { }

  ngOnInit() { }

}
