import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-lists-itens-screen',
  templateUrl: './lists-itens-screen.page.html',
  styleUrls: ['./lists-itens-screen.page.scss'],
})
export class ListsItensScreenPage implements OnInit {
  listaId!: string;
  items!: any[];
  lista:any = {}; 
  categories!:any[];
  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/items'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  measures!:any[];
  status!:any[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getList();
    this.getItems();

  }

  getItems(): void {
    if (this.listaId) {
      forkJoin({
        items: this.http.get<any[]>(this.apiItems, { params: { listId:this.listaId } }),
        measures: this.http.get<any[]>(this.apiMeasures),
        status: this.http.get<any[]>(this.apiStatus)
      }).pipe(
        map(({ items, measures, status }) => {
          return items.map(item => {
            const measure = measures.find(
              medida => medida.id_medida === item.id_medida
            );
            const ic_status = status.find(
              status => status.id_status === item.id_status
            );
            return {
              ...item,
              ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida',
              ds_categoria: ic_status ? ic_status.ds_status : 'Status Desconhecida',
            };
          });
        })
      ).subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        },
        error => console.error('Erro ao buscar dados:', error)
      );
    } else {
      console.error("Id não encontrado");
    }
  }



  getList(): void {
    if(this.listaId){
      const apiLista =  `${this.apiList}/${this.listaId}`;
    
      forkJoin({
        list: this.http.get<any>(apiLista),
        categories: this.http.get<any[]>(this.apiCategories)
      }).subscribe(
        ({ list, categories }) => {
          this.categories = categories; 

          const category = this.categories.find(
            categoria => categoria.id_categoria === list.id_categoria
          );
          this.lista={
            ...list,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          }
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else{
      console.error("Id não encontrado")
    }
  }



}
