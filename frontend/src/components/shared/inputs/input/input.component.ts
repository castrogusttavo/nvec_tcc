import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {
  textInput: string | undefined;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.setText();
  }  

  setText() {
    this.textInput = 'E-mail';
  }
}
