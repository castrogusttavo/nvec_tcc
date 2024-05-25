import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-report-css',
  templateUrl: './report-css.page.html',
  styleUrls: ['./report-css.page.scss'],
})
export class ReportCssPage implements OnInit {
  public segmentValue: string = 'segment';
  private previousToken: string | null = null;

  totalSpend: any[] = [];
  totalSaved: any[] = [];
  balance: any = {
    createdList: [],
    completedLists: [],
    communities: []
  };

  user!:string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  segmentChanged(event: any){
    console.log("Segment changed:", event.detail.value);
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
    this.getUserId();
    this.checkTokenChanges();

    this.getTotalSpend();
    this.getTotalSaved();
    this.getBalance();
    this.getTotalValueByCategory();
  }

  getUserId(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Adicione esta linha para verificar o token no console
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken.userId); // Adicione esta linha para verificar o token decodificado no console
      this.user = decodedToken.userId; // Supondo que o email do usuário esteja no token com a chave 'userEmail'
    }
  }

  getTotalSpend(): void {
    this.http.get<any[]>('http://localhost:3001/api/report/totalSpend', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        userId: this.user
      }
    }).subscribe(data => {
      console.log('Total Spend:', data); // Adicione esta linha para verificar os dados no console
      this.totalSpend = data;
    }, err => {
      console.error('Erro ao buscar total gasto', err);
    });
  }

  getTotalSaved(): void {
    this.http.get<any[]>('http://localhost:3001/api/report/totalSaved', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        userId: this.user
      }
    }).subscribe(data => {
      console.log('Total Saved:', data); // Adicione esta linha para verificar os dados no console
      this.totalSaved = data;
    }, err => {
      console.error('Erro ao buscar total economizado', err);
    });
  }

  getBalance(): void {
    this.http.get<any>('http://localhost:3001/api/report/balance', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        userId: this.user
      }
    }).subscribe(data => {
      console.log('Balance:', data);
      this.balance = data;
    }, err => {
      console.error('Erro ao buscar balanço', err);
    });
  }

  getTotalValueByCategory(): void {
    this.http.get<any[]>('http://localhost:3001/api/report/totalValueByCategory', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        userId: this.user
      }
    }).subscribe(data => {
      console.log('Total Value By Category:', data);
    }, err => {
      console.error('Erro ao buscar valor total por categoria', err);
    });
  }

  checkTokenChanges(): void {
    setInterval(() => {
      const currentToken = localStorage.getItem('token');
      const token = localStorage.getItem('token');

      if (currentToken !== this.previousToken) {
        this.previousToken = currentToken;
        this.getUserId();
      }
    }, 1000);
  }

}
