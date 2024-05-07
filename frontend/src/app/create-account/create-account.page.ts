import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  async createUser(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Email:', this.email);
    console.log('Senha:', this.password);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/register',
        { name: this.name, email: this.email, password: this.password }
      ).toPromise();

      console.log('Conta criada com sucesso:', response);
      this.router.navigate(['/pre-page']);
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    }
  }

}
