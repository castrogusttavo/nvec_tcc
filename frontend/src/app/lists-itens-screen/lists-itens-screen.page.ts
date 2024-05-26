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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getList();
    console.log(
      this.lista
    )
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
