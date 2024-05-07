import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  email: string = '';
  userName: string | undefined;

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
