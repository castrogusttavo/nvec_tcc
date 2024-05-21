import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  templateUrl: './toast-error.component.html',
  styleUrls: ['./toast-error.component.scss'],
})
export class ToastErrorComponent  implements OnInit {
  @Input() titulo: string | undefined; // titulo modificavel
  @Input() conteudo: string | undefined;  // conteudo modificavel

  constructor() { }

  ngOnInit() {}

}
