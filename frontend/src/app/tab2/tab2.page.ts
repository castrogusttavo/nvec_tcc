import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin, map } from 'rxjs';
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
  userId!: number;

  lists!:any[];
  recentLists!:any[];
  category!:string;
  private apiLists = "http://localhost:3001/api/lists";
  private apiRecentLists="http://localhost:3001/api/recentLists";
  private apiCategories="http://localhost:3001/api/categories";

  textForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private jwtHelper: JwtHelperService) {
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  getRecentLists(): void {
    forkJoin({
      lists: this.http.get<any[]>(this.apiRecentLists, { params: { userId:this.userId } }),
      categories: this.http.get<any[]>(this.apiCategories)
    }).pipe(
      map(({ lists, categories }) => {
        return lists.map(list => {
          const category = categories.find(categoria => categoria.id_categoria === list.id_categoria);
          return {
            ...list,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          };
        });
      })
    ).subscribe(
      data => this.recentLists = data,
      error => console.error('Erro ao buscar dados: ', error)
    );
  }

  getLists():Observable<any[]>{
    return this.http.get<any[]>(this.apiLists, { params: { userId:this.userId } });
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
    const searchText = event.target.value.replace(/\s/g, ''); // Remover espaços
    this.searchText = searchText;
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
    this.getRecentLists();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); 
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); 
      this.userName = decodedToken.userName; 
      this.userId = decodedToken.userId;
    }
  }
}
