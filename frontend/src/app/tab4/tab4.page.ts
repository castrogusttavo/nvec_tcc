import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private previousToken: string | null = null;
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Criar comunidade', imagePath: './../assets/svg/add.svg' },
    { title: 'Volta às Aulas', imagePath: 'https://blog.etiquetaseadesivos.com.br/wp-content/uploads/2021/12/various-stationery-school-and-office-supplies-over-wooden-texture-picture-id546761524.jpg' },
    { title: 'Atacadista', imagePath: 'https://newtrade.com.br/wp-content/uploads/2017/05/supermercado-10-05.jpg' }
  ];
  itemsToShow: any[] = this.originalItems;

  email: string = '';
  userName!: string;
  userId!: string;

  createdCommunitiesCount: number = 0;
  loginCommunitiesCount: number = 0;
  invitationCommunitiesCount: number = 0;
  state: string = 'Offline';  // Initialize the state as Offline

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private cdr: ChangeDetectorRef) {}

  communities!: any[];
  private apiCommunity = 'http://localhost:3001/api/communities';

  getCommunities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCommunity);
  }

  ngOnInit(): void {
    this.getCommunities().subscribe(communities => {
      this.communities = communities;
    });
    this.getUserState(); // Determine the user state based on the token
    this.getUserName();
    this.getUserId();  // Fetch userId on initialization
    this.checkTokenChanges();  // Check for token changes every second
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

  getUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken.userId;
      this.fetchCreatedCommunitiesCount();
      this.fetchLoginCommunitiesCount();
      this.fetchInvitationCommunitiesCount();
    }
  }

  getUserState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const isTokenExpired = this.jwtHelper.isTokenExpired(token);
        this.state = isTokenExpired ? 'Offline' : 'Online';
      } catch (error) {
        this.state = 'Offline';
      }
    } else {
      this.state = 'Offline';
    }
    this.cdr.detectChanges(); // Notify Angular to detect changes
  }

  checkTokenChanges(): void {
    setInterval(() => {
      const currentToken = localStorage.getItem('token');

      if (currentToken !== this.previousToken) {
        this.previousToken = currentToken;
        this.getUserName();
      }
    }, 1000);
  }

  fetchCreatedCommunitiesCount(): void {
    this.http.get<any>(`http://localhost:3001/api/createdCommunitiesCount`, {
      params: { userId: this.userId }
    }).subscribe(
      (data) => {
        console.log('Created Communities Count:', data);
        this.createdCommunitiesCount = data.length > 0 ? data[0].communities : 0;
      },
      (error) => {
        console.error('Erro ao buscar o número de comunidades criadas', error);
      }
    );
  }

  fetchLoginCommunitiesCount(): void {
    this.http.get<any>(`http://localhost:3001/api/loginCommunitiesCount`, {
      params: { userId: this.userId }
    }).subscribe(
      (data) => {
        console.log('Login Communities Count:', data);
        this.loginCommunitiesCount = data.length > 0 ? data[0]['comunidades entradas'] : 0;
      },
      (error) => {
        console.error('Erro ao buscar o número de comunidades acessadas', error);
      }
    );
  }

  fetchInvitationCommunitiesCount(): void {
    this.http.get<any>(`http://localhost:3001/api/invitationCommunitiesCount`, {
      params: { userId: this.userId }
    }).subscribe(
      (data) => {
        console.log('Invitation Communities Count:', data);
        this.invitationCommunitiesCount = data.invitationCount;
      },
      (error) => {
        console.error('Erro ao buscar o número de convites de comunidades', error);
      }
    );
  }

  formatNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
