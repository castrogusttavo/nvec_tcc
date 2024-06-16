import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ListDataService } from '../service/list.service';

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

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private jwtHelper: JwtHelperService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private listDataService: ListDataService
  ) {
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });

    this.listDataService.newList$.subscribe(newList => {
      this.addNewList(newList);
    });
  }

  getRecentLists(): Observable<any[]> {
    return forkJoin({
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
    this.loadAllLists();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.userName;
      this.userId = decodedToken.userId;
    }
  }

  loadAllLists() {
    forkJoin([this.getLists(), this.getRecentLists()]).subscribe(
      ([lists, recentLists]) => {
        this.lists = lists;
        this.filteredLists = lists;
        this.recentLists = recentLists;
      },
      error => console.error('Erro ao buscar dados: ', error)
    );
  }

  addNewList(newList: any) {
    console.log('Adicionando nova lista:', newList); // Adicione este log
    this.lists.push(newList);
    this.filteredLists = this.lists;
    this.cdr.detectChanges();
  }
}
