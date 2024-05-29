import { Component, OnInit, Input, forwardRef, ElementRef, Renderer2 } from '@angular/core';
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
  @Input() validateStrength: boolean = false

  inputValue: string = '';
  passwordStrengthMessage: string = '';
  passwordRequirements: string[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(
    private platform: Platform,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

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
      this.updatePasswordRequirementsMargin(value);
      console.log(`Password strength: ${this.passwordStrengthMessage}`);
    }
    this.onChange(value);
  }

  checkPasswordStrength(password: string): string {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length;

    if (password.length < 8 || /^[a-zA-Z]+$/.test(password) || /(.)\1{2,}/.test(password) || this.isSimilarToPersonalData(password)) {
      return 'Senha fraca';
    } else if (password.length >= 8 && password.length < 12 && typesCount >= 2 && !this.hasObviousSequence(password.toLowerCase()) && !this.isSimilarToPersonalData(password)) {
      return 'Senha média';
    } else if(password.length >= 12 && typesCount == 2 && !this.hasObviousSequence(password.toLowerCase()) && !this.isSimilarToPersonalData(password)){
      return 'Senha média';
    }
    else if (password.length >= 12 && typesCount == 3 && !this.hasObviousSequence(password.toLowerCase()) && !this.containsCommonWords(password.toLowerCase()) && !this.isSimilarToPersonalData(password)) {
      return 'Senha forte';
    }
    return 'A senha não se encaixa em nenhum dos padrões';
  }

  getPasswordRequirements(password: string): string[] {
    const requirements: string[] = [];
    const hasLetter = /[a-zA-Z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length;

    if (password.length < 8) {
      requirements.push('- Pelo menos 8 caracteres');
    }

    if (typesCount < 2) {
      requirements.push('- 2 tipos de caracteres (letras, números, símbolos)');
    }

    if (password.length >= 8 && typesCount >= 2 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase()) && !this.isSimilarToPersonalData(password)) {
      if (password.length < 12) {
        if( typesCount < 3){
        requirements.push('Senha forte (opcional):');
        requirements.push('- Pelo menos 12 caracteres');
        requirements.push('- 3 tipos de caracteres (letras, números, símbolos)');
      } else{
        requirements.push('Senha forte (opcional):');
        requirements.push('- Pelo menos 12 caracteres');
      }
      }else if (password.length >= 12 && typesCount < 3 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase())) {
        requirements.push('Senha forte (opcional):');
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

  updatePasswordRequirementsMargin(password: string) {
    const hasLetter = /[a-zA-Z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const typesCount = [hasLetter, hasNumeric, hasSymbol].filter(Boolean).length;

    const requirementsContainer = this.elRef.nativeElement.querySelector('.password-requirements-container');
    if (requirementsContainer) {
      console.log("---------------")
      console.log("Condição 6")
      if (password.length < 8 && typesCount === 2 && !this.hasObviousSequence(password.toLowerCase()) && !this.containsCommonWords(password.toLowerCase()) && !this.isSimilarToPersonalData(password) && !/(.)\1{2,}/.test(password.toLowerCase()) ) {
        this.renderer.setStyle(requirementsContainer, 'marginRight', '224px');
      }
      else if (password.length >= 8 && typesCount >= 2 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase()) && !this.isSimilarToPersonalData(password)) {
        if (password.length < 12) {
          if( typesCount < 3){
          // requirements.push('Senha forte (opcional):');
          // requirements.push('- Pelo menos 12 caracteres');
          // requirements.push('- 3 tipos de caracteres (letras, números, símbolos)');
          this.renderer.setStyle(requirementsContainer, 'marginRight', '75px');
          console.log("---------------")
          console.log("Condição 1")
        } else{
          this.renderer.setStyle(requirementsContainer, 'marginRight', '215px');
          console.log("---------------")
          console.log("Condição 2")
          // requirements.push('Senha forte (opcional):');
          // requirements.push('- Pelo menos 12 caracteres');215px
        }
        }else if (password.length >= 12 && typesCount < 3 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase())) {
          // this.renderer.setStyle(requirementsContainer, 'marginRight', '215px');
          console.log("---------------")
          console.log("Condição 3")
          // requirements.push('Senha forte (opcional):');
          // requirements.push('- 3 tipos de caracteres (letras, números, símbolos)');
        }
      }
      else if (password.length >= 8 && password.length < 12 && typesCount >= 2 && !/(.)\1{2,}/.test(password) && !this.hasObviousSequence(password.toLowerCase()) && !this.isSimilarToPersonalData(password)){
        this.renderer.setStyle(requirementsContainer, 'marginRight', '220px');
        console.log("---------------")
        console.log("Condição 4")
      }else {
        console.log("---------------")
        console.log("Condição 5")
        this.renderer.removeStyle(requirementsContainer, 'marginRight');
      }
    }else{
      // this.renderer.setStyle(requirementsContainer, 'marginRight', '215px');
      console.log("---------------")
      console.log("Condição ELSE")
    }
  }
}
