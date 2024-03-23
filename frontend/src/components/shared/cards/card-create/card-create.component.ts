import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
})
export class CardCreateComponent  implements OnInit {

  @Input() description:string|undefined
  constructor() { }

  ngOnInit() {}

}
