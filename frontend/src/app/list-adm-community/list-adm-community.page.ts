import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-list-adm-community',
  templateUrl: './list-adm-community.page.html',
  styleUrls: ['./list-adm-community.page.scss'],
})
export class ListAdmCommunityPage implements OnInit {
  userId!:number;
  communityId!:number;
  
  public listaId!: string;
  
  items!: any[];
  community:any = {}; 
  categories!:any[];
  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/items'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  apiCommunity = "http://localhost:3001/api/communities"
  measures!:any[];
  status!:any[];

  constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
    });
    this.getCommunity();
    this.getItems();
  }

  
  getCommunity(): void {
    if(this.communityId){
      const apiCommunity =  `${this.apiCommunity}/${this.communityId}`;
    
      forkJoin({
        community: this.http.get<any>(apiCommunity),
        categories: this.http.get<any[]>(this.apiCategories)
      }).subscribe(
        ({ community, categories }) => {
          this.categories = categories; 

          const category = this.categories.find(
            categoria => categoria.id_categoria === community.id_categoria
          );
          this.community={
            ...community,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          }

          console.log("comunidade",this.community)
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else{
      console.error("Id não encontrado")
    }
  }

  getItems(): void {
    if (this.communityId) {

      const items =  `${this.apiItems}/${this.userId}/${this.communityId}`;

      forkJoin({
        items: this.http.get<any[]>(items),
        measures: this.http.get<any[]>(this.apiMeasures)
        // status: this.http.get<any[]>(this.apiStatus)
      }).pipe(
        map(({ items, measures }) => {
          return items.map(item => {
            const measure = measures.find(
              medida => medida.id_medida === item.id_medida
            );
            return {
              ...item,
              ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida',
            };
          });
        })
      ).subscribe(
        data => {
          console.log('Dados dos itens:', data);
          this.items = data;
        },
        error => console.error('Erro ao buscar dados:', error)
      );
    } else {
      console.error("Id não encontrado");
    }
  }

}
