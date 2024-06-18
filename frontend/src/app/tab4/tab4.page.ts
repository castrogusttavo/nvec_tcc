import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ComunidadeService } from '../service/comunidade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private previousToken: string | null = null;
  searchText: string = '';
  originalItems: any[] = [
    { title: 'Criar comunidade', imagePath: './../assets/svg/add.svg', routerLink: ['/create-comunnity'] },
  ];
  itemsToShow: any[] = this.originalItems;

  email: string = '';
  userId!: number;
  userName!: string;

  createdCommunitiesCount: number = 0;
  loginCommunitiesCount: number = 0;
  invitationCommunitiesCount: number = 0;
  state: string = 'Offline';

  communities: any[] = [];
  filteredCommunities: any[] = [];
  private apiCommunity = 'http://localhost:3001/api/communities';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private comunidadeService: ComunidadeService 
  ) {}

  ngOnInit(): void {
    this.getUserState(); 
    this.getUserName();
    this.getUserId(); 
    this.checkTokenChanges();

    // Subscribe to the communities observable from the service
    this.comunidadeService.communities$.subscribe(communities => {
      this.communities = communities;
      this.filteredCommunities = communities;
      this.filterItems(); // Ensure the items are filtered based on the current search text
    });

    // Fetch initial communities
    this.fetchCommunities().subscribe(communities => {
      this.comunidadeService.setCommunities(communities);
    });
  }

  fetchCommunities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCommunity, { params: { userId: this.userId } });
  }

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.filterItems();
  }

  filterItems() {
    const normalizedSearchText = this.searchText.trim().replace(/\s+/g, ' ').toLowerCase();

    if (normalizedSearchText === '') {
      this.itemsToShow = this.originalItems;
      this.filteredCommunities = this.communities;
      return;
    }

    this.itemsToShow = this.originalItems.filter(item =>
      item.title.toLowerCase().includes(normalizedSearchText)
    );

    this.filteredCommunities = this.communities.filter(community =>
      community.nm_comunidade.toLowerCase().includes(normalizedSearchText)
    );
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.userName;
      this.userId = decodedToken.userId;
      this.cdr.detectChanges();
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
    this.cdr.detectChanges();
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
        this.createdCommunitiesCount = data;
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
        this.loginCommunitiesCount = data;
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

  navigateToCommunityPage(communityId: number, creatorId: number): void {
    if (this.userId === creatorId) {
      this.router.navigate(['/list-adm-community', this.userId, communityId]);
    } else {
      this.router.navigate(['/community-lists-sobre', communityId]);
    }
  }
}
