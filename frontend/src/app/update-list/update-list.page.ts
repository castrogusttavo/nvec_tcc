import { Component, OnInit } from '@angular/core';
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
  name!:string;
  category!:any[];
  description!:string;
  expense!:string;
  address!:string;
  user!:string;

  inputTextValue: string | undefined;
  categoriaSelecionada!:string;

  listaId!: string;
 
  private apiCategories = 'http://localhost:3001/api/categories';
  private apiList = 'http://localhost:3001/api/lists';

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiCategories);
  }

  constructor(private route: ActivatedRoute,private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
    this.getUserId();
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
    event.preventDefault();

    console.log('Name:', this.name);
    console.log('Categoria:', this.categoriaSelecionada);
    console.log('Descrição:', this.description);
    console.log('Endereço:', this.address);
    console.log('Valor máximo:', this.expense);

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/lists/${this.listaId}`,
        { nm_lista: this.name, rd_lista:this.expense, ds_lista:this.description,id_categoria:this.categoriaSelecionada, id_usuario:this.user, end_lista:this.address }
      ).toPromise();

      console.log('Lista atualizada com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao atualizar lista:', err);
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

    this.http.delete(`http://localhost:3001/api/lists/${this.listaId}`)
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