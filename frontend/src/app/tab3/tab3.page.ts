import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

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

  
  
}
