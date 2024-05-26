import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  registerForm: FormGroup;
  passwordStrengthMessage: string = '';

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]]
    });
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrengthMessage = this.checkPasswordStrength(value);
    });
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

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasLetter = /[a-zA-Z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length;

      if (value.length < 8 || /^[a-zA-Z]+$/.test(value) || /(.)\1{2,}/.test(value)) {
        return { weakPassword: true };
      } else if (value.length >= 8 && typesCount == 2 && !this.hasObviousSequence(value.toLowerCase())) {
        return null;
      } else if (value.length >= 12 && typesCount == 3 && !this.hasObviousSequence(value.toLowerCase()) && !this.containsCommonWords(value.toLowerCase())) {
        return null;
      }
      return { weakPassword: true };
    };
  }

  checkPasswordStrength(password: string): string {
    const hasLetter = /[a-zA-Z]/.test(password); // Verifica se há pelo menos uma letra
    const hasNumeric = /\d/.test(password); // Verifica se há pelo menos um dígito numérico
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Verifica se há pelo menos um símbolo
    const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length; // Conta o número de tipos de caracteres presentes
  
    if (password.length < 8 || /^[a-zA-Z]+$/.test(password) || /(.)\1{2,}/.test(password)) {
      return 'Senha fraca';
    } else if (password.length >= 8 && typesCount == 2 && !this.hasObviousSequence(password.toLowerCase())) {
      return 'Senha média';
    } else if (password.length >= 12 && typesCount == 3 && !this.hasObviousSequence(password.toLowerCase()) && !this.containsCommonWords(password.toLowerCase())) {
      return 'Senha forte';
    }
    return 'Senha fraca';
  } 

  hasObviousSequence(value: string): boolean {
    const obviousSequences = ["1234", "abcd", "password", "qwerty"];
    return obviousSequences.some(sequence => value.includes(sequence));
  }

  containsCommonWords(value: string): boolean {
    const commonWords = ["password", "123456", "qwerty", "abc123"];
    return commonWords.some(word => value.includes(word));
  }
}
