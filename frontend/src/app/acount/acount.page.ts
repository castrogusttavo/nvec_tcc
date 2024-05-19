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
}
