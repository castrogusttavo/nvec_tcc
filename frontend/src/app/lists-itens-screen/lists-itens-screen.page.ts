import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  // constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  // name: string = 'arroz';
  // value: string = '12';

  // async criarItem() {
  //   try {
  //     console.log('Nome : ', this.name);
  //     console.log('Valor : ', this.value);
  
  //     const response: any = await this.http.post(
  //       'http://localhost:3001/items',
  //       { nm_item: this.name, vl_uni: this.value }
  //     ).toPromise();
  
  //     console.log('Item criado com sucesso:', response);
  //     this.router.navigate(['/tabs/tab2']);
  //   } catch (err) {
  //     console.error('Erro ao criar item:', err);
  //   }
  // }
  

}
