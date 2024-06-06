import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list-adm-community',
  templateUrl: './list-adm-community.page.html',
  styleUrls: ['./list-adm-community.page.scss'],
})
export class ListAdmCommunityPage implements OnInit {
  userId!: string;
  communityId!: string;
  listaId!: number;
  items!: any[];
  categories!: any[];
  measures!: any[];
  status!: any[];
  community: any = {};
  
  apiList = 'http://localhost:3001/api/list';
  apiCategories = 'http://localhost:3001/api/categories';
  apiItems = 'http://localhost:3001/api/items';
  apiMeasures = 'http://localhost:3001/api/measures';
  apiStatus = 'http://localhost:3001/api/status';
  apiCommunity = 'http://localhost:3001/api/communities';

  constructor(
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.listaId = params['communityId'];
      console.log(`Params - userId: ${this.userId}, communityId: ${this.communityId}`);
    });
    this.getCommunity();
    this.getItems();
  }

  getCommunity(): void {
    if (this.communityId) {
      const apiCommunity = `${this.apiCommunity}/${this.communityId}`;
      forkJoin({
        community: this.http.get<any>(apiCommunity),
        categories: this.http.get<any[]>(this.apiCategories)
      }).subscribe(
        ({ community, categories }) => {
          this.categories = categories;
          const category = this.categories.find(
            categoria => categoria.id_categoria === community.id_categoria
          );
          this.community = {
            ...community,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          };
          console.log('Comunidade:', this.community);
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else {
      console.error('Id não encontrado');
    }
  }

  getItems(): void {
    if (this.communityId) {
      const itemsUrl = `${this.apiItems}/${this.userId}/${this.communityId}`;
      console.log(`Fetching items from: ${itemsUrl}`);

      forkJoin({
        items: this.http.get<any[]>(itemsUrl),
        measures: this.http.get<any[]>(this.apiMeasures)
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
      console.error('Id não encontrado');
    }
  }
}
