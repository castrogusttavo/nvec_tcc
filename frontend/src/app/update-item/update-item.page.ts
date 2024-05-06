import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
  }

   // FormGroup para validação dos campos de texto
   textForm: FormGroup;

   constructor(private formBuilder: FormBuilder) {
     // Inicialização do FormGroup para validação dos campos de texto
     this.textForm = this.formBuilder.group({
       valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
       valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
       peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
     });
   }

}
