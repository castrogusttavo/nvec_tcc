import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-criar',
  templateUrl: './modal-criar.component.html',
  styleUrls: ['./modal-criar.component.scss'],
})
export class ModalCriarComponent  implements OnInit {
  isModalOpen = false;
  @Input() button: string = '';
  @Input() inputs: { placeholder: string, id: string }[][] = [];

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor() { }

  ngOnInit() {}

}
