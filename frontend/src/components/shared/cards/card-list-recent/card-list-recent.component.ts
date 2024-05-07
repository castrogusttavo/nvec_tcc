import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list-recent',
  templateUrl: './card-list-recent.component.html',
  styleUrls: ['./card-list-recent.component.scss'],
})
export class CardListRecentComponent  implements OnInit {

  @Input() category:string|undefined
  @Input() name:string|undefined
  @Input() description:string|undefined
  @Input() imagePath:string|undefined

  constructor() { }

  ngOnInit() {}

}
