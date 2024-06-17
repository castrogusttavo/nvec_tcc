import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.page.html',
  styleUrls: ['./update-list.page.scss'],
})
export class UpdateListPage implements OnInit {
  name!: string;
  oldName!: string;
  categories: any[] = [];
  description!: string;
  oldDescription!: string;
  expense!: string;
  formattedExpense!: string;  // Variável para armazenar o valor formatado
  oldExpense!: string;
  address!: string;
  oldAddress!: string;
  user!: string;
  oldCategoria!: string;
  categoriaSelecionada!: string;
  listaId!: string;

  private apiCategories = 'http://localhost:3001/api/categories';
  private apiList = 'http://localhost:3001/api/lists';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
      if (this.listaId) {
        this.getListDetails(this.listaId);
      }
    });
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.getUserId();
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCategories);
  }

  getListDetails(id: string): void {
    this.http.get<any>(`${this.apiList}/${id}`).subscribe(list => {
      this.oldName = list.nm_lista;
      this.oldDescription = list.ds_lista;
      this.oldExpense = list.rd_lista;
      this.oldAddress = list.end_lista;
      this.oldCategoria = list.id_categoria;
      this.categoriaSelecionada = list.id_categoria;
      this.user = list.id_usuario;
      this.formattedExpense = this.formatValueForDisplay(list.rd_lista);  // Format the expense value for display
    });
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

  async updateList(event: { preventDefault: () => void; }) {
    if (this.listaId) {
      event.preventDefault();

      console.log('Name:', this.name);
      console.log('Categoria:', this.categoriaSelecionada);
      console.log('Descrição:', this.description);
      console.log('Endereço:', this.address);
      console.log('Valor máximo:', this.expense);

      try {
        const response: any = await this.http.patch(
          `${this.apiList}/${this.listaId}`,
          {
            nm_lista: this.name,
            rd_lista: this.expense,  // Use the unformatted value
            ds_lista: this.description,
            id_categoria: this.categoriaSelecionada,
            id_usuario: this.user,
            end_lista: this.address
          }
        ).toPromise();

        console.log('Lista atualizada com sucesso:', response);
        this.router.navigate(['/tabs/tab1']);
      } catch (err) {
        console.error('Erro ao atualizar lista:', err);
      }
    }
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

  deleteList(): void {
    this.http.delete(`${this.apiList}/${this.listaId}`)
      .toPromise()
      .then(() => {
        console.log('Lista excluída com sucesso');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => {
        console.error('Erro ao excluir lista:', error);
      });
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

  formatValueForDisplay(value: string): string {
    const numericValue = parseFloat(value).toFixed(2);
    return `R$ ${numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}
