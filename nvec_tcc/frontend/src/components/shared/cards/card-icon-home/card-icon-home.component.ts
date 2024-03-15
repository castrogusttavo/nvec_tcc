import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-icon-home',
  templateUrl: './card-icon-home.component.html',
  styleUrls: ['./card-icon-home.component.scss'],
})
export class CardIconHomeComponent  implements OnInit {

  constructor() { }
  @Input() imagePath: string | undefined;

  ngOnInit() {}

}
