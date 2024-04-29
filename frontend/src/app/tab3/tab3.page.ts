import { Component } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

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

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    if (event.target.id === 'valor') {
      let valor = event.target.value;
      valor = valor.replace(/\D/g, '');
      if (valor !== '') {
        valor = 'R$ ' + valor;
        valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
      event.target.value = valor;
    }
  }

}
