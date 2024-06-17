import { Component, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListDataService } from '../service/list.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  name!: string;
  category!: any[];
  description!: string;
  expense!: string;
  formattedExpense!: string;  // Variável para armazenar o valor formatado
  address!: string;
  user!: string;
  date: string = new Date().toISOString().split('T')[0];
  inputTextValue: string | undefined;
  categoriaSelecionada!: string;
  private apiCategories = 'http://localhost:3001/api/categories';
  private apiListDetails = 'http://localhost:3001/api/lists';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private listDataService: ListDataService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
    this.getUserName();
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCategories);
  }

  async createList(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/lists',
        { 
          nm_lista: this.name, 
          rd_lista: this.expense,  // Use o valor não formatado
          ds_lista: this.description, 
          id_categoria: this.categoriaSelecionada, 
          id_usuario: this.user, 
          end_lista: this.address 
        }
      ).toPromise();

      console.log('Lista criada com sucesso:', response);
      
      const listDetails = await this.http.get(`${this.apiListDetails}/${response.id_lista}`).toPromise();

      console.log('Detalhes da lista:', listDetails);
      this.listDataService.addNewList(listDetails);
      this.router.navigate(['/tabs/tab2']);
    } catch (err) {
      console.error('Erro ao criar lista:', err);
    }
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.user = decodedToken.userId;
    }
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  }

  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
    }
  }

  formatCurrency(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      event.target.value = '';
      this.expense = '';  // Reset the expense value
      return;
    }
    const numericValue = (Number(value) / 100).toFixed(2).toString();
    this.expense = numericValue;  // Store the numeric value
    const formattedValue = numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    event.target.value = `R$ ${formattedValue}`;
  }
}
