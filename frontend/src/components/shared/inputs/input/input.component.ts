import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() maxlength!: number;
  @Input() readOnly: boolean = false;
  @Input() userName: string = '';
  @Input() validateStrength: boolean = false; // Novo Input

  inputValue: string = '';
  passwordStrengthMessage: string = '';
  passwordRequirements: string[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private platform: Platform) {}

  ngOnInit() {}

  writeValue(value: any): void {
    this.inputValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(value: string) {
    this.inputValue = value;
    if (this.type === 'password' && this.validateStrength) {
      this.passwordStrengthMessage = this.checkPasswordStrength(value);
      this.passwordRequirements = this.getPasswordRequirements(value);
      console.log(`Password strength: ${this.passwordStrengthMessage}`);
    }
    this.onChange(value);
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

  getPasswordRequirements(password: string): string[] {
    const requirements: string[] = [];

    if (password.length < 8) {
      requirements.push('- Pelo menos 8 caracteres.');
    }

    const hasLetter = /[a-zA-Z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length;

    if (typesCount < 2) {
      requirements.push('- 2 tipos de caracteres (letras, números, símbolos)');
    }

    if (password.length >= 8 && typesCount == 2) {
      if (password.length < 12) {
        requirements.push('Senha forte (opcional):');
        requirements.push('- Pelo menos 12 caracteres.');
      }
      if (password.length <= 12) {
        requirements.push('Senha forte (opcional):');
        requirements.push('- 3 tipos de caracteres (letras, números, símbolos)');
      }
      if (password.length > 12 && typesCount < 3 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase())) {
        requirements.push('- 3 tipos de caracteres (letras, números, símbolos)');
      }
    }

    if (this.hasObviousSequence(password.toLowerCase()) || /(.)\1{2,}/.test(password.toLowerCase())) {
      requirements.push('- Não é permitido sequências óbvias ou repetitivas');
    }    

    if (this.isSimilarToPersonalData(password)) {
      requirements.push('- Não é permitido semelhança ao nome');
    }

    return requirements;
  }

  hasObviousSequence(value: string): boolean {
    const obviousSequences = ["1234", "abcd", "password", "qwerty"];
    return obviousSequences.some(sequence => value.includes(sequence));
  }

  containsCommonWords(value: string): boolean {
    const commonWords = ["password", "123456", "qwerty", "abc123"];
    return commonWords.some(word => value.includes(word));
  }

  isSimilarToPersonalData(password: string): boolean {
    if (!this.userName) return false;
    return password.toLowerCase().includes(this.userName.toLowerCase());
  }

  // Atualiza o contador de caracteres
  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      if (currentLength === maxLength) {
        counter.textContent = 'Limite atingido';
        counter.style.color = '#FF554A';
        counter.style.fontSize = '12px';
        counter.style.marginLeft = '280px';
      } else if (currentLength > 0) {
        counter.textContent = `${currentLength} / ${maxLength}`;
        counter.style.color = '#888';
        counter.style.fontSize = '12px';
        counter.style.marginLeft = '340px';
      } else {
        counter.textContent = '';
      }
    }
  }
}
