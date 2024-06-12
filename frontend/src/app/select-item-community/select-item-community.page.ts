import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-select-item-community',
  templateUrl: './select-item-community.page.html',
  styleUrls: ['./select-item-community.page.scss'],
})
export class SelectItemCommunityPage implements OnInit {

  userId!: string;
  listaId!: string;
  itemId!: string;

  apiItems = 'http://localhost:3001/api/staticItems';
  apiMeasures = "http://localhost:3001/api/measures";
  apiStatus = "http://localhost:3001/api/status";  // Adicione o endpoint para o status
  measures!: any[];
  status!: any[];
  item: any={};

  textForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listaId = params['communityId'];
      this.itemId = params['idItem'];
      this.userId = params['userId'];
      this.getItem();
      console.log("Id comunidade: ", this.listaId)
      console.log("Id item: ", this.itemId)
      console.log("Id ususario: ", this.userId)
    });
  }

  getItem(): void {
    if (this.itemId) {
      forkJoin({
        item: this.http.get<any>(this.apiItems, { params: { listId: this.listaId, itemId:this.itemId } }),
        measures: this.http.get<any[]>(this.apiMeasures)
        
      }).subscribe(
        ({ item, measures }) => {
          this.measures = measures;
          this.item=item;
          console.log("está vazio???", this.item)  
          console.log("Id comunidade: ", this.listaId)
          console.log("Id item: ", this.itemId)
    
          const items = this.item.find(
            (            items: { id_item_fixo: any; }) => items.id_item_fixo === items.id_item_fixo
          );
          const measure = this.measures.find(
            medida => medida.id_medida === item.id_medida
          );
  
          this.item = {
            ...items,
            ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida'
          };
  
          console.log("Dados do item:", this.item);
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else {
      console.error("Id não encontrado");
    }
  }

}
