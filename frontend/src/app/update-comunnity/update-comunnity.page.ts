import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-comunnity',
  templateUrl: './update-comunnity.page.html',
  styleUrls: ['./update-comunnity.page.scss'],
})
export class UpdateComunnityPage implements OnInit {

  userId!:number;
  communityId!:number;
  
  name!:string;
  category!:any[];
  about!:string;
  address!:string;
  inputTextValue: string | undefined;
  categoriaSelecionada!:string;
  private apiCategories = 'http://localhost:3001/api/categories'

  constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
    });
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });

  }

  async updateCommunity(event: { preventDefault: () => void; }) {

    event.preventDefault();

    console.log('Name: ', this.name);
    console.log('Categoria: ', this.categoriaSelecionada);
    console.log('Sobre: ', this.about);
    console.log('Endereço: ', this.address);
    console.log('Id do usuário: ', this.userId);

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/communities/${this.communityId}`,
        { nm_comunidade: this.name, id_categoria: this.categoriaSelecionada, sb_comunidade:this.about, end_comunidade:this.address}
      ).toPromise();

      console.log('Comunidade atualizada com sucesso:', response);
      this.router.navigate(['/tabs/tab4']);
    } catch (err) {
      console.error('Erro ao atualizar comunidade:', err);
    }
  }

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiCategories);
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

  deleteCommunity(): void {
    this.http.delete<any>(`http://localhost:3001/api/communities/${this.userId}/${this.communityId}`).subscribe(
      response => {
        console.log('Comnunidade excluída com sucesso:', response);
        this.router.navigate(['/tabs/tab1']);
      },
      error => {
        console.error('Erro ao excluir comunidade:', error);
      }
    );
  }


} 

