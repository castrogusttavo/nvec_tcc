import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable} from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Criar comunidade', imagePath: './../assets/svg/add.svg' },
    { title: 'Volta às Aulas', imagePath: 'https://blog.etiquetaseadesivos.com.br/wp-content/uploads/2021/12/various-stationery-school-and-office-supplies-over-wooden-texture-picture-id546761524.jpg' },
    { title: 'Atacadista', imagePath: 'https://newtrade.com.br/wp-content/uploads/2017/05/supermercado-10-05.jpg' }
  ];
  itemsToShow: any[] = this.originalItems;

  email: string = '';
  userName!: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private cdr: ChangeDetectorRef
  ) {}

  communities!:any[];
  private apiCommunity = "http://localhost:3001/api/communities";

  getCommunities():Observable<any[]>{
    return this.http.get<any[]>(this.apiCommunity);
  }

  ngOnInit(): void {
    this.getCommunities().subscribe(communities=>{
      this.communities=communities;
    });
    this.getUserName();
  }

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.filterItems();
  }

  filterItems() {
    if (this.searchText === '') {
      this.itemsToShow = this.originalItems;
      return;
    }

    this.itemsToShow = this.originalItems.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      this.userName = decodedToken.userName;
      this.cdr.detectChanges(); // Notify Angular to detect changes
    }
  }
}
