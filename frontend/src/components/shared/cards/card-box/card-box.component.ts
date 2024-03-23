import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
})
export class CardBoxComponent  implements OnInit {

  @Input() action:string|undefined
  @Input() description:string|undefined
  constructor() { }

  ngOnInit() {}

}
