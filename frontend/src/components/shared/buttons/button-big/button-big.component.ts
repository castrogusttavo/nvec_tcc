import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-big',
  templateUrl: './button-big.component.html',
  styleUrls: ['./button-big.component.scss'],
})
export class ButtonBigComponent  implements OnInit {
  @Input() disabled: boolean = false; 

  constructor() { }

  ngOnInit() {}

}
