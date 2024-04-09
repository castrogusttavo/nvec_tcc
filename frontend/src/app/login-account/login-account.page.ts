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
  usuarios: any[] = [
    {
      "id_usuario": 1,
      "nm_usuario": "Álvaro Oliveira",
      "senha_usuario": "çenhaForte123",
      "email_usuario": "alvarooliveira@email.com",
      "id_assinatura": 2
    },
    {
      "id_usuario": 2,
      "nm_usuario": "Juliana Barroso",
      "senha_usuario": "julianaÇenha",
      "email_usuario": "julianabarroso@email.com",
      "id_assinatura": 3
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(){
  }

  loginUser(event: Event): void {
    event.preventDefault();
    const usuario = this.usuarios.find(u => u.email_usuario === this.email && u.senha_usuario === this.password);
    if (usuario) {
      console.log('Usuário autenticado: ', usuario);
      this.router.navigate(['/tabs/tab1']);
    } else {
      alert('Credenciais inválidas');
    }
  }
}
