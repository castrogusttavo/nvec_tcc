import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userName: string | undefined;
  private previousToken: string | null = null;
  private apiRecentLists="http://localhost:3001/api/recentLists";
  private apiCategories="http://localhost:3001/api/categories";
  private apiRecentCommunities="http://localhost:3001/api/recentCommunities";
  recentLists!:any[];


  constructor(
    private http:  HttpClient, 
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.checkTokenChanges();
    this.getRecentLists();
  }



  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      this.userName = decodedToken.userName;
    }
  }

  //forkjoin faz uma cmbinação com vários observables, igual ao join no mysql
  //pipe pega qualquer numero de operadores como argumento e retorna um novo observable
  getRecentLists(): void {
    forkJoin({
      lists: this.http.get<any[]>(this.apiRecentLists),
      categories: this.http.get<any[]>(this.apiCategories)
    }).pipe(
      map(({ lists, categories }) => {
        return lists.map(list => {
          const category = categories.find(categoria => categoria.id_categoria === list.id_categoria);
          return {
            ...list,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          };
        });
      })
    ).subscribe(
      data => this.recentLists = data,
      error => console.error('Erro ao buscar dados: ', error)
    );
  }


  checkTokenChanges(): void {
    setInterval(() => {
      const currentToken = localStorage.getItem('token');
      const token = localStorage.getItem('token');

      if (currentToken !== this.previousToken) {
        this.previousToken = currentToken;
        this.getUserName();
      }
    }, 1000);
  }
}
