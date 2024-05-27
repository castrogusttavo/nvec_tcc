import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userName: string | undefined;
  private previousToken: string | null = null;
  recentLists: any[] = [];
  recentCommunities: any[] = [];
  public noRecentLists: boolean = true;
  public noRecentCommunities: boolean = true;

  user!: string;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserName();
    this.checkTokenChanges();
    this.CallBackToast();
    this.getUserId();
    this.fetchRecentLists();
    this.fetchRecentCommunities();
    this.checkRecentLists();
    this.checkRecentCommunities();
  }

  getUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.user = decodedToken.userId;
    }
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      this.userName = decodedToken.userName;
    }
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
      }, 7000); // 10 segundos antes de ocultar o toast
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
          userId: this.user,
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
          userId: this.user,
        },
      }
    );
  }

  fetchRecentLists(): void {
    this.getRecentList().subscribe(
      (data) => {
        console.log('Recent Lists:', data);
        this.recentLists = data;
      },
      (error) => {
        console.error('Erro ao buscar listas recentes', error);
      }
    );
  }

  fetchRecentCommunities(): void {
    this.getRecentCommunities().subscribe( // Corrigido o método chamado aqui
      (data) => {
        console.log('Recent Communities:', data);
        this.recentCommunities = data;
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

}
