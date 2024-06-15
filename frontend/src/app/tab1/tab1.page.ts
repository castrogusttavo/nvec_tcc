import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userName: string | undefined;
  private previousToken: string | null = null;
  private apiRecentLists = "http://localhost:3001/api/recentLists";
  private apiCategories = "http://localhost:3001/api/categories";
  private apiRecentCommunities = "http://localhost:3001/api/recentCommunities";
  private apiCommunity = "http://localhost:3001/api/communities";
  
  recentLists: any[] = [];
  recentCommunities: any[] = [];
  communities: any[] = [];
  public noRecentLists: boolean = true;
  public noRecentCommunities: boolean = true;

  userId!: number;
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.checkTokenChanges();
    this.getUserId(); 
    this.fetchDataAfterUserId();
    this.CallBackToast();
  }

  fetchDataAfterUserId(): void {
    this.getRecentLists();
    this.getCommunities();
    this.fetchRecentLists();
    this.fetchRecentCommunities();
  }

  getUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken.userId;
    }
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
    data => {
      console.log('Dados recebidos: ', data); // Adiciona este console.log para exibir os dados
      this.recentLists = data;
    },
    error => console.error('Erro ao buscar dados: ', error)
  );
}


  getCommunities(): void {
    forkJoin({
      communities: this.http.get<any[]>(this.apiCommunity, { params: { userId: this.userId } }),
      categories: this.http.get<any[]>(this.apiCategories)
    }).pipe(
      map(({ communities, categories }) => {
        return communities.map(community => {
          const category = categories.find(categoria => categoria.id_categoria === community.id_categoria);
          return {
            ...community,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          };
        });
      })
    ).subscribe(
      data => this.communities = data,
      error => console.error('Erro ao buscar dados: ', error)
    );
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

  CallBackToast(): void {
    const toast = document.getElementById('myToast');
    if (toast) {
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');

        setTimeout(() => {
          toast.style.display = 'none';
        }, 500); // Tempo de duração da animação de saída
      }, 4000); // 4 segundos antes de ocultar o toast
    }
  }

  getRecentList() {
    return this.http.get<any[]>(
      'http://localhost:3001/api/recentListUser',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.userId,
        },
      }
    );
  }

  getRecentCommunities() {
    return this.http.get<any[]>(
      'http://localhost:3001/api/recentCommunitiesUser',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.userId,
        },
      }
    );
  }

  fetchRecentLists(): void {
    this.getRecentList().subscribe(
      (data) => {
        this.recentLists = data;
        this.checkRecentLists(); // Atualizar o estado após buscar as listas
      },
      (error) => {
        console.error('Erro ao buscar listas recentes', error);
      }
    );
  }

  fetchRecentCommunities(): void {
    this.getRecentCommunities().subscribe(
      (data) => {
        this.recentCommunities = data;
        this.checkRecentCommunities(); // Atualizar o estado após buscar as comunidades
      },
      (error) => {
        console.error('Erro ao buscar comunidades recentes', error);
      }
    );
  }

  getListClass(index: number): string {
    const colorClasses: { [key: number]: string } = {
      1: 'card-blue',
      2: 'card-orange',
      3: 'card-green',
      4: 'card-red',
    };
    return colorClasses[index] || 'card-default'; // Use 'card-default' se o index não for 1-4
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês é base zero, então adicionamos 1
    const year = date.getFullYear().toString().slice(-2); // Pegamos os últimos dois dígitos do ano
    return `${day}/${month}/${year}`;
  }

  // Método para verificar se há listas recentes
  checkRecentLists(): void {
    this.noRecentLists = this.recentLists.length === 0;
  }

  // Método para verificar se há comunidades recentes
  checkRecentCommunities(): void {
    this.noRecentCommunities = this.recentCommunities.length === 0;
  }

  navigateToCommunityPage(communityId: number, creatorId: number): void {

    if (this.userId === creatorId) {
        this.router.navigate(['/list-adm-community', this.userId, communityId]);
    } else {
        this.router.navigate(['/community-lists-sobre', communityId]);
    }
}

}
