import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.page.html',
  styleUrls: ['./acount.page.scss'],
})
export class AcountPage implements OnInit {
  email: string = '';
  name: string = '';

  userEmail!: string;
  userName!: string;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getUserName();
    this.getUserEmail();
  }

  async logout(): Promise<void> {
    try {
      // Chama a rota de logout no servidor, se necessário
      await this.http.post('http://localhost:3001/api/logout', {}).toPromise();

      console.log('Logout bem-sucedido');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Remover o token do localStorage
      localStorage.removeItem('token');

      // Redirecionar para a página de login
      this.router.navigate(['/login-account']);
    }
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      this.userName = decodedToken.userName;
      this.cdr.detectChanges(); // Notify Angular to detect changes
    }
  }

  getUserEmail(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      this.userEmail = decodedToken.userEmail;
      this.cdr.detectChanges(); // Notify Angular to detect changes
    }
  }
}
