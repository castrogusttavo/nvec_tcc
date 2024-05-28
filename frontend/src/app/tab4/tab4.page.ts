import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Criar comunidade', imagePath: './../assets/svg/add.svg' },
  ];
  itemsToShow: any[] = this.originalItems;

  email: string = '';
  userId!:number;
  userName: string | undefined;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService
  ) {}

  communities!:any[];
  private apiCommunity = "http://localhost:3001/api/communities";

  getCommunities():Observable<any[]>{
    return this.http.get<any[]>(this.apiCommunity,{ params: { userId:this.userId } });
  }

  ngOnInit(): void {
    this.getUserName();
    console.log(this.userId);
    this.getCommunities().subscribe(communities=>{
      this.communities=communities;
      console.log(this.communities);
    })
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
      this.userId = decodedToken.userId; 
    }
  }
  
}
