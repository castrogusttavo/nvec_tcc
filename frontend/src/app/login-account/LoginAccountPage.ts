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
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('').subscribe(data => {
      this.usuarios = data.usuarios;
    });
  }

  loginUser(event: Event): void {
    event.preventDefault();
    const usuario = this.usuarios.find(u => u.username === this.email && u.password === this.password);

    if (usuario) {
      console.log('Usuário autenticado: ', usuario);
      this.router.navigate(['/tabs/tab1']);
    } else {
      alert('Credenciais inválidas');
    }
  }
}
