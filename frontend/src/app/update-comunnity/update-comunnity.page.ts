import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-comunnity',
  templateUrl: './update-comunnity.page.html',
  styleUrls: ['./update-comunnity.page.scss'],
})
export class UpdateComunnityPage implements OnInit {

  userId!: number;
  communityId!: number;
  
  name: string = '';
  oldName: string = '';
  category: any[] = [];
  about: string = '';
  oldAbout: string = '';
  address: string = '';
  oldAddress: string = '';
  oldCategoria: string = '';

  categoriaSelecionada: string = '';

  private apiCategories = 'http://localhost:3001/api/categories';
  private apiCommunity = 'http://localhost:3001/api/communities';

  constructor(
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.getCommunityDetails(this.communityId);
    });
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
  }

  async updateCommunity(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      const response: any = await this.http.patch(
        `${this.apiCommunity}/${this.communityId}`,
        { 
          nm_comunidade: this.name, 
          id_categoria: this.categoriaSelecionada, 
          sb_comunidade: this.about, 
          end_comunidade: this.address 
        }
      ).toPromise();

      console.log('Comunidade atualizada com sucesso:', response);
      this.router.navigate(['/list-adm-community', this.userId, this.communityId]);
    } catch (err) {
      console.error('Erro ao atualizar comunidade:', err);
    }
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCategories);
  }

  getCommunityDetails(id: number): void {
    this.http.get<any>(`${this.apiCommunity}/${id}`).subscribe(community => {
      this.oldName = community.nm_comunidade;
      this.oldAbout = community.sb_comunidade;
      this.oldAddress = community.end_comunidade;
      this.oldCategoria = community.ds_categoria; // Assuming ds_categoria is the display name of the category
      this.categoriaSelecionada = community.id_categoria;
      this.userId = community.id_usuario;
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

  deleteCommunity(): void {
    this.http.delete<any>(`${this.apiCommunity}/${this.userId}/${this.communityId}`).subscribe(
      response => {
        console.log('Comnunidade excluída com sucesso:', response);
        this.router.navigate(['/tabs/tab4']);
      },
      error => {
        console.error('Erro ao excluir comunidade:', error);
      }
    );
  }
}
