import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.page.html',
  styleUrls: ['./acount.page.scss'],
})
export class AcountPage implements OnInit {
  email: string = '';
  name: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    try {
      await this.http.post('http://localhost:3001/api/logout', {}).toPromise();

      console.log('Logout bem-sucedido');

      this.router.navigate(['/login-account']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);

      this.router.navigate(['/login-account']);
    }
  }
}
