import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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
    private jwtHelper: JwtHelperService
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
            rd_lista: this.expense,
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
}
