import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-plans',
  templateUrl: './card-plans.component.html',
  styleUrls: ['./card-plans.component.scss'],
})
export class CardPlansComponent  implements OnInit {

  @Input() planItems: string[] | undefined;
  @Input() planTitle: string | null | undefined;
  @Input() planPreco: string | undefined;
  @Input() planDesc: string | undefined;
  @Input() customClass: string | undefined;

  constructor() { }

  ngOnInit() {}

}
