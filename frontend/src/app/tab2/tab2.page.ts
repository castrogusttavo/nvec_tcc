import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

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

  email: string = '';
  userName: string | undefined;

  // FormGroup para validação dos campos de texto
  textForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
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

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this.http.get<{ userName: string }>('http://localhost:3001/api/latest-user')
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar o nome do usuário:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          this.userName = data.userName;
        }
      );
  }

  loginUser(): void {
    this.http.post<{ userName: string }>('http://localhost:3001/api/login', { email: this.email })
      .pipe(
        catchError(error => {
          console.error('Erro ao fazer login:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          this.userName = data.userName;
        }
      );
  }

}
