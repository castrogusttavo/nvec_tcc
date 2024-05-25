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
  value: string = '';

  // Atualiza o contador de caracteres
  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      if (currentLength === 16) {
        counter.textContent = 'Limite atingido';
        counter.style.color = '#FF554A';
        counter.style.fontSize = '12px';
        counter.style.marginLeft = '280px';
      } else if (currentLength > 0){
        counter.textContent = `${currentLength} / ${maxLength}`;
        counter.style.color = '#888'; 
        counter.style.fontSize = '12px';
        counter.style.marginLeft = '340px';
      }else {
        counter.textContent = '';
      }
    }    
  }


  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  constructor(private platform: Platform) {}

  ngOnInit() {
  }
}
