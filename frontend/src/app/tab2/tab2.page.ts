import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  lists!:any[];
  category!:string;
  private apiLists = "http://localhost:3001/api/lists";

  // FormGroup para validação dos campos de texto
  textForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private jwtHelper: JwtHelperService) {
    // Inicialização do FormGroup para validação dos campos de texto
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  getLists():Observable<any[]>{
    return this.http.get<any[]>(this.apiLists);
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
    this.getLists().subscribe(lists=>{
      this.lists = lists;
    })
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Adicione esta linha para verificar o token no console
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Adicione esta linha para verificar o token decodificado no console
      this.userName = decodedToken.userName; // Supondo que o email do usuário esteja no token com a chave 'userEmail'
    }
  }
}
