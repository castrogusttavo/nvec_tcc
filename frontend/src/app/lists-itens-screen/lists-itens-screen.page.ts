import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists-itens-screen',
  templateUrl: './lists-itens-screen.page.html',
  styleUrls: ['./lists-itens-screen.page.scss'],
})
export class ListsItensScreenPage implements OnInit {
  isModalOpen1 = false;
  isModalOpen2 = false;

  setOpen(modalNumber: number, isOpen: boolean) {
    if (modalNumber === 1) {
      this.isModalOpen1 = isOpen;
    } else if (modalNumber === 2) {
      this.isModalOpen2 = isOpen;
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
