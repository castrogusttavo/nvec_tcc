import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  clearSearchText() {
    this.searchText = '';
  }
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Guloseimas', description: 'Doces pros irmãos'},
    { title: 'Compras do mês', description: 'Não esquecer o leite'},
    { title: 'Móveis para mudança', description: 'Principalmente cadeiras'}
  ];
  itemsToShow: any[] = this.originalItems;
  
  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.filterItems();
  }

  filterItems() {
    if (this.searchText === '') {
      this.itemsToShow = this.originalItems;
      return;
    }
  
    const searchTextLower = this.searchText.toLowerCase();
    this.itemsToShow = this.originalItems.filter(item => 
      item.title.toLowerCase().includes(searchTextLower)
    );
  }
  
  
  

}
