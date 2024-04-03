import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../backend/src/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.page.html',
  styleUrls: ['./login-account.page.scss'],
})

export class LoginAccountPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  fazerLogin() {
    const dadosLogin ={
      email: this.email,
      senha: this.senha
    };

    this.authService.login(dadosLogin).subscribe(() =>{
      console.log('Login feito com sucesso');
    },
    (err: any) => {
      console.error('Erro ao fazer login:', err)
    });
  }
}