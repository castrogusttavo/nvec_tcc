import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Criar comunidade', imagePath: './../assets/svg/add.svg' },
    { title: 'Volta às Aulas', imagePath: 'https://blog.etiquetaseadesivos.com.br/wp-content/uploads/2021/12/various-stationery-school-and-office-supplies-over-wooden-texture-picture-id546761524.jpg' },
    { title: 'Atacadista', imagePath: 'https://newtrade.com.br/wp-content/uploads/2017/05/supermercado-10-05.jpg' }
  ];
  itemsToShow: any[] = this.originalItems;

  email: string = '';
  userName: string | undefined;

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.filterItems();
  }

  filterItems() {
    if (this.searchText === '') {
      this.itemsToShow = this.originalItems;
      return;
    }

    this.itemsToShow = this.originalItems.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Adicione esta linha para verificar o token no console
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Adicione esta linha para verificar o token decodificado no console
      this.userName = decodedToken.userName; // Supondo que o email do usuário esteja no token com a chave 'userEmail'
    }
  }
}
