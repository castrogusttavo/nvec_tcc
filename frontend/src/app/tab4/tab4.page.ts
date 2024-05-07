import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this.http.get<{ userName: string }>('http://localhost:3001/api/latest-user')
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar o nome do usuário:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          this.userName = data.userName;
        }
      );
  }

  loginUser(): void {
    this.http.post<{ userName: string }>('http://localhost:3001/api/login', { email: this.email })
      .pipe(
        catchError(error => {
          console.error('Erro ao fazer login:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          this.userName = data.userName;
        }
      );
  }

}
