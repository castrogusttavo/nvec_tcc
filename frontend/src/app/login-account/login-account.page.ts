import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.page.html',
  styleUrls: ['./login-account.page.scss'],
})
export class LoginAccountPage implements OnInit {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(){
  }

  async loginUser(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      console.error('Form is not valid');
      return;
    }

    const { email, password } = this.loginForm.value;

    console.log('Email:', email);
    console.log('Senha:', password);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/login',
        { email, senha: password }
      ).toPromise();

      console.log('Login bem-sucedido: ', response);

      localStorage.setItem('token', response.token);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao fazer login: ', err);
    }
  }
}
