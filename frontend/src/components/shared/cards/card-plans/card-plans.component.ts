import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-plans',
  templateUrl: './card-plans.component.html',
  styleUrls: ['./card-plans.component.scss'],
})
export class CardPlansComponent  implements OnInit {

  @Input() planItems: string[] | undefined;

  constructor() { }

  ngOnInit() {}

}
