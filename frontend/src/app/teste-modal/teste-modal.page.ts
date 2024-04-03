import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-modal',
  templateUrl: './teste-modal.page.html',
  styleUrls: ['./teste-modal.page.scss'],
})
export class TesteModalPage implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor() { }

  ngOnInit() {
  }

}
