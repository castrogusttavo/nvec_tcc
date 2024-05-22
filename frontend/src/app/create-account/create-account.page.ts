import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  registerForm: FormGroup;

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  async createUser(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (this.registerForm.invalid) {
      console.error('Form is not valid');
      return;
    }

    const { name, email, password } = this.registerForm.value;

    console.log('Email:', email);
    console.log('Senha:', password);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/register',
        { name, email, password }
      ).toPromise();

      console.log('Conta criada com sucesso:', response);

      localStorage.setItem('token', response.token);
      this.router.navigate(['/pre-page']);
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    }
  }

}
