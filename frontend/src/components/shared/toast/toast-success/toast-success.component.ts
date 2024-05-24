import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  templateUrl: './toast-success.component.html',
  styleUrls: ['./toast-success.component.scss'],
})
export class ToastSuccessComponent  implements OnInit {
  @Input() titulo: string | undefined; // titulo modificavel
  @Input() conteudo: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
