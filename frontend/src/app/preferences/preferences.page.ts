import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  pinFormatter(value: number) {
    return `${value}%`;
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  clearCache() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3001/api/clearCache', { headers })
      .subscribe({
        next: () => {
          console.log('Cache limpo com sucesso');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao limpar cache:', err);
        }
      });
  }
}
