import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public segmentValue: string = 'segment';
  private previousToken: string | null = null;

  totalSpend: any[] = [];
  totalSaved: any[] = [];
  totalValueByCategory: any[] = [];
  balance: any = {
    createdList: [],
    completedLists: [],
    communities: [],
  };

  heights: { [key: string]: string } = {};
  heightsSaved: { [key: string]: string } = {}; // Adicionada propriedade

  totalSpendSemester: any[] = [];
  totalSavedSemester: any[] = [];
  totalValueByCategorySemester: any[] = [];
  balanceSemester: any = {
    createdList: [],
    completedLists: [],
    communities: [],
  };

  heightsSemester: { [key: string]: string } = {};
  heightsSavedSemester: { [key: string]: string } = {};

  user!: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
    this.getUserId();
    this.checkTokenChanges();

    this.loadData();
    this.getTotalSaved();
    this.getBalance();

    this.loadSemesterData();
    this.getTotalSavedSemester();
    this.getBalanceSemester();
  }

  getUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.user = decodedToken.userId;
    }
  }

  getTotalSpend() {
    return this.http.get<any[]>('http://localhost:3001/api/report/totalSpend', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: this.user,
      },
    });
  }

  getTotalValueByCategory() {
    return this.http.get<any[]>(
      'http://localhost:3001/api/report/totalValueByCategory',
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

  getTotalSpendSemester() {
    return this.http.get<any[]>(
      'http://localhost:3001/api/reportSemester/totalSpend',
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

  getTotalValueByCategorySemester() {
    return this.http.get<any[]>(
      'http://localhost:3001/api/reportSemester/totalValueByCategory',
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

  loadData(): void {
    forkJoin({
      totalSpend: this.getTotalSpend(),
      totalValueByCategory: this.getTotalValueByCategory(),
    }).subscribe(
      ({ totalSpend, totalValueByCategory }) => {
        this.totalSpend = totalSpend;
        this.totalValueByCategory = totalValueByCategory;

        // Calcular alturas para cada categoria em totalSpend
        this.totalSpend.forEach((spend) => {
          const totalRendas = this.getTotalRendas(spend.ds_categoria);
          this.heights[spend.ds_categoria] = this.calculateHeight(
            spend.total_gasto,
            totalRendas
          );
        });
      },
      (err) => {
        console.error('Erro ao carregar dados', err);
      }
    );
  }

  loadSemesterData(): void {
    forkJoin({
      totalSpend: this.getTotalSpendSemester(),
      totalValueByCategory: this.getTotalValueByCategorySemester(),
    }).subscribe(
      ({ totalSpend, totalValueByCategory }) => {
        this.totalSpendSemester = totalSpend;
        this.totalValueByCategorySemester = totalValueByCategory;

        // Calcular alturas para cada categoria em totalSpendSemester
        this.totalSpendSemester.forEach((spend) => {
          const totalRendas = this.getTotalRendasSemester(spend.ds_categoria);
          this.heightsSemester[spend.ds_categoria] = this.calculateHeight(
            spend.total_gasto,
            totalRendas
          );
        });
      },
      (err) => {
        console.error('Erro ao carregar dados', err);
      }
    );
  }

  getTotalSaved(): void {
    this.http
      .get<any[]>('http://localhost:3001/api/report/totalSaved', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.user,
        },
      })
      .subscribe(
        (data) => {
          this.totalSaved = data;

          // Calcular alturas para cada categoria em totalSaved
          this.totalSaved.forEach((save) => {
            const totalRendas = this.getTotalRendas(save.ds_categoria);
            this.heightsSaved[save.ds_categoria] = this.calculateHeight(
              save.total_economizado,
              totalRendas
            );
          });
        },
        (err) => {
          console.error('Erro ao buscar total economizado', err);
        }
      );
  }

  getTotalSavedSemester(): void {
    this.http
      .get<any[]>('http://localhost:3001/api/reportSemester/totalSaved', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.user,
        },
      })
      .subscribe(
        (data) => {
          this.totalSavedSemester = data;

          // Calcular alturas para cada categoria em totalSavedSemester
          this.totalSavedSemester.forEach((save) => {
            const totalRendas = this.getTotalRendasSemester(save.ds_categoria);
            this.heightsSavedSemester[save.ds_categoria] = this.calculateHeight(
              save.total_economizado,
              totalRendas
            );
          });
        },
        (err) => {
          console.error('Erro ao buscar total economizado', err);
        }
      );
  }

  getBalance(): void {
    this.http
      .get<any>('http://localhost:3001/api/report/balance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.user,
        },
      })
      .subscribe(
        (data) => {
          this.balance = data;
        },
        (err) => {
          console.error('Erro ao buscar balanço', err);
        }
      );
  }

  getBalanceSemester(): void {
    this.http
      .get<any>('http://localhost:3001/api/reportSemester/balance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: this.user,
        },
      })
      .subscribe(
        (data) => {
          this.balanceSemester = data;
        },
        (err) => {
          console.error('Erro ao buscar balanço', err);
        }
      );
  }

  checkTokenChanges(): void {
    setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== this.previousToken) {
        this.previousToken = currentToken;
        this.getUserId();
      }
    }, 1000);
  }

  calculateHeight(totalGasto: string, totalRendas: number): string {
    const totalGastoNum = parseFloat(totalGasto);

    if (isNaN(totalGastoNum) || totalRendas === 0) {
      return '0%';
    }

    const percentageSpent = (totalGastoNum / totalRendas) * 100;
    const maxHeight = 100;
    const height = Math.min(percentageSpent, maxHeight);
    return `${height}%`;
  }

  getTotalRendas(categoria: string): number {
    const category = this.totalValueByCategory.find(
      (cat) => cat.ds_categoria === categoria
    );
    const totalRendas = category ? parseFloat(category.total_rendas) : 0;
    return isNaN(totalRendas) ? 0 : totalRendas;
  }

  getTotalRendasSemester(categoria: string): number {
    const category = this.totalValueByCategorySemester.find(
      (cat) => cat.ds_categoria === categoria
    );
    const totalRendas = category ? parseFloat(category.total_rendas) : 0;
    return isNaN(totalRendas) ? 0 : totalRendas;
  }
}
