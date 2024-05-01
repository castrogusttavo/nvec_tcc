import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Dropdown peso
  inputTextValue: string | undefined;
  dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL'];
  selectedOption: string| undefined;
  dropdownVisible: boolean = false;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  // Dropdown peso
  
  textForm: FormGroup;

  searchResults: string[] = [];

  search(searchText: string) {
    this.searchResults = ['Result 1', 'Result 2', 'Result 3'];
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  }

  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  formatCurrency(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); 
    value = value.replace(/^0+/, ''); 
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    input.value = value;
  }

}
