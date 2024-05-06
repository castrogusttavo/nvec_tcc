import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent  implements OnInit {
  @Input() button: string = '';
  @Input() cancelButtonText: string;
  @Input() deleteButtonText: string;
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();

  onCancelClick() {
    this.cancelClicked.emit();
  }

  constructor() {
    // Inicializando as propriedades de entrada no construtor
    this.cancelButtonText = '';
    this.deleteButtonText = '';
  }

  ngOnInit() {}

  // Dropdown medida
  inputTextValue: string = '';
  dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  selectedOption: string | undefined = 'Kg';
  dropdownVisible: boolean = false;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  onSelectChange(event: any) {
    this.selectedOption = event.detail.value;
    console.log('Opção selecionada:', this.selectedOption);
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

  // Formata o valor do campo de texto para o formato de moeda
  formatCurrency(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); 
    value = value.replace(/^0+/, ''); 
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    input.value = value;
    // console.log('formatCurrency:', value); O CONSOLE VAI PARA TODOS EIN
  }


}

