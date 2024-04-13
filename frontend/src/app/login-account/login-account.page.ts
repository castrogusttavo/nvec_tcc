import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.page.html',
  styleUrls: ['./login-account.page.scss'],
})
export class LoginAccountPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(){
  }

  async loginUser(event: any) {
    event.preventDefault();
  
    try {
      const response: any = await this.http.post('http://localhost:3001/login', { email_usuario: this.email, senha_usuario: this.password }).toPromise();
  
      console.log('Login bem-sucedido: ', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao fazer login: ', err);
    }
  }
  

}
