import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button-arrow',
  templateUrl: './button-arrow.component.html',
  styleUrls: ['./button-arrow.component.scss'],
})
export class ButtonArrowComponent  implements OnInit {

  @Input() imagePath: string | undefined;  

  constructor() { }

  ngOnInit() {}

}
