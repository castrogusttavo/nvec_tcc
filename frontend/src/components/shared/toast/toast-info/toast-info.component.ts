import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-info',
  templateUrl: './toast-info.component.html',
  styleUrls: ['./toast-info.component.scss'],
})
export class ToastInfoComponent  implements OnInit {
  @Input() titulo: string | undefined; // titulo modificavel
  @Input() conteudo: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
