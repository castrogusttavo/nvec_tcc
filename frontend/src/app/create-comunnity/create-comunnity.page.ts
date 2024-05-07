import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-comunnity',
  templateUrl: './create-comunnity.page.html',
  styleUrls: ['./create-comunnity.page.scss'],
})
export class CreateComunnityPage implements OnInit {

  // Dropdown medida
  inputTextValue: string | undefined;
  dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  selectedOption: string | undefined = 'Kg';
  dropdownVisible: boolean = false;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  ngOnInit(): void {
    
  }

  // Função para formatar o contador de caracteres
  customCounterFormatter(inputLength: number, maxLength: number) {
    return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  }

  // Atualiza o contador de caracteres
  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
    }
  }

  // FormGroup para validação dos campos de texto
  textForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Inicialização do FormGroup para validação dos campos de texto
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      medida: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantidade: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  // Formata o valor do campo de texto para o formato de moeda
  formatCurrency(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); 
    value = value.replace(/^0+/, ''); 
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    input.value = value;
  }

}
