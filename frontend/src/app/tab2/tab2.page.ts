import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  filteredLists: any[] = [];

  email: string = '';
  userName: string | undefined;
  userId!: number;
  originalItems: any[] = [
    { title: 'Criar lista', imagePath: './../assets/svg/add.svg', routerLink: ['/create-list'] },
  ];
  itemsToShow: any[] = this.originalItems;

  lists!: any[];
  recentLists!: any[];
  category!: string;
  private apiLists = "http://localhost:3001/api/lists";
  private apiRecentLists = "http://localhost:3001/api/recentLists";
  private apiCategories = "http://localhost:3001/api/categories";

  textForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private jwtHelper: JwtHelperService, private cdr: ChangeDetectorRef) {
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  getRecentLists(): void {
    forkJoin({
      lists: this.http.get<any[]>(this.apiRecentLists, { params: { userId: this.userId } }),
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

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiLists, { params: { userId: this.userId } });
  }

  clearSearchText() {
    this.searchText = '';
    this.filteredLists = this.lists;
  }

  searchText: string = '';

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.filterItems();
  }

  filterItems() {
    // Normalize the search text: remove extra spaces
    const normalizedSearchText = this.searchText.trim().replace(/\s+/g, ' ').toLowerCase();

    if (normalizedSearchText === '') {
      this.filteredLists = this.lists;
      return;
    }

    this.filteredLists = this.lists.filter(list =>
      list.nm_lista.toLowerCase().includes(normalizedSearchText)
    );
  }

  ngOnInit(): void {
    this.getUserName();
    this.getLists().subscribe(lists => {
      this.lists = lists;
      this.filteredLists = lists; // Initialize filteredLists with all lists
    });
    this.getRecentLists();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.userName;
      this.userId = decodedToken.userId;
    }
  }
}
