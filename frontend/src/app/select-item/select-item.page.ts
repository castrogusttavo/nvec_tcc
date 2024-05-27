import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.page.html',
  styleUrls: ['./select-item.page.scss'],
})
export class SelectItemPage implements OnInit {

  listaId!:number;
  itemId!:number;

  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/items'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  measures!:any[];
  status!:any[];
  item: any={};



  
  constructor(private route: ActivatedRoute, private http: HttpClient,private formBuilder: FormBuilder) {
    // Inicialização do FormGroup para validação dos campos de texto
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listaId = params['idLista'];
      this.itemId = params['idItem'];
    });
    this.getItem();
  }

  getItem(): void {
    if(this.itemId){
      forkJoin({
        item: this.http.get<any>(`${this.apiItems}/${this.itemId}`),
        measures: this.http.get<any[]>(this.apiMeasures),
        status: this.http.get<any[]>(this.apiStatus)
      }).subscribe(
        ({ item, measures, status}) => {
          this.measures = measures; 
          this.status = status; 

          const measure = this.measures.find(
            medida => medida.id_medida === item.id_medida
          );
          const ic_status = this.status.find(
            status => status.id_status === item.id_status
          );
          this.item={
            ...item,
            ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida',
            ds_status: ic_status ? ic_status.ds_status : 'Status Desconhecido'
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

   // FormGroup para validação dos campos de texto
   textForm: FormGroup;


}
