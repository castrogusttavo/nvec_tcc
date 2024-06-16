import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ComunidadeService } from '../service/comunidade.service';  // Import the shared service

@Component({
  selector: 'app-create-comunnity',
  templateUrl: './create-comunnity.page.html',
  styleUrls: ['./create-comunnity.page.scss'],
})
export class CreateComunnityPage implements OnInit {
  userId!: number;
  name!: string;
  category!: any[];
  about!: string;
  address!: string;
  inputTextValue: string | undefined;
  categoriaSelecionada!: string;
  private apiCategories = 'http://localhost:3001/api/categories';
  private apiCommunities = 'http://localhost:3001/api/communities';  // Add API endpoint for communities

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private comunidadeService: ComunidadeService  // Inject the shared service
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
  }

  getCategories() {
    return this.http.get<any[]>(this.apiCategories);
  }

  // Função para formatar o contador de caracteres
  customCounterFormatter(inputLength: number, maxLength: number) {
    return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  }

  // Atualiza o contador de caracteres
  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
    }
  }

  async createCommunity(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
      const response: any = await this.http.post(
        this.apiCommunities,
        {
          nm_comunidade: this.name,
          id_categoria: this.categoriaSelecionada,
          sb_comunidade: this.about,
          end_comunidade: this.address,
          userId: this.userId
        }
      ).toPromise();

      // Fetch the complete details of the newly created community
      const communityDetails: any = await this.http.get(`${this.apiCommunities}/${response.id_comunidade}`).toPromise();

      console.log('Comunidade criada com sucesso:', communityDetails);
      this.comunidadeService.addComunidade(communityDetails);  // Notify the service about the new community
      this.router.navigate(['/tabs/tab4']);
    } catch (err) {
      console.error('Erro ao criar comunidade:', err);
    }
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken.userId);
      this.userId = decodedToken.userId;
      console.log(this.userId);
    }
  }
}
