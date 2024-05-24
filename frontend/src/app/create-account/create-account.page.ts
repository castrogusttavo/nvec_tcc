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

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordAverageValidator()]]
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

export function passwordAverageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const name = control.parent?.get('name')?.value; // Adicionando verificação para control.parent e control.parent.get('name')

    if (!value || !name) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const noObviousSequence = !hasObviousSequence(value.toLowerCase());

    const notSimilarToPersonalData = !similarToPersonalData(value, name); // Verificando a semelhança com o nome do usuário

    const passwordValid = (hasUpperCase && hasLowerCase && hasNumeric) || (hasNumeric && hasSymbol) || (hasUpperCase && hasLowerCase && hasSymbol);

    return passwordValid && noObviousSequence && notSimilarToPersonalData ? null : { passwordAverage: true };
  };
}

function hasObviousSequence(value: string): boolean {
  // Verifica se a senha contém sequências óbvias
  const obviousSequences = ["1234", "abcd"]; // Adicione outras sequências óbvias conforme necessário
  return obviousSequences.some(sequence => value.includes(sequence));
}

function similarToPersonalData(password: string, personalData: string): boolean {
  // Verifica se a senha é semelhante a dados pessoais
  const similarToUsername = password.toLowerCase().includes(personalData.toLowerCase());
  return similarToUsername;
}
