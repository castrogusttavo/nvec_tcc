import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-item-community',
  templateUrl: './update-item-community.page.html',
  styleUrls: ['./update-item-community.page.scss'],
})
export class UpdateItemCommunityPage implements OnInit {

  listaId!:number;
  itemId!:number;
  userId!:number;

  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/itemsCommunity'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  measures!:any[];
  status!:any[];
  item: any={};

  medidaSelecionada!:string;
  name!:string;
  price!:string;
  quantity!:number;
  icStatus!:string;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {
    // Inicialização do FormGroup para validação dos campos de texto
    this.textForm = this.formBuilder.group({
      valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listaId = params['idList'];
      this.itemId = params['idItem'];
      this.userId = params['userId'];
    });
    // this.getItem();
    this.getMeasures().subscribe(measures => {
      this.measures = measures;
    });
  }

  
  getMeasures():Observable<any[]>{
    return this.http.get<any[]>(this.apiMeasures);
  }

  // getItem(): void {
  //   if(this.itemId){
  //     forkJoin({
  //       item: this.http.get<any>(`${this.apiItems}/${this.itemId}`),
  //       measures: this.http.get<any[]>(this.apiMeasures),
  //       status: this.http.get<any[]>(this.apiStatus)
  //     }).subscribe(
  //       ({ item, measures, status}) => {
  //         this.measures = measures; 
  //         this.status = status; 

  //         const measure = this.measures.find(
  //           medida => medida.id_medida === item.id_medida
  //         );
  //         const ic_status = this.status.find(
  //           status => status.id_status === item.id_status
  //         );
  //         this.item={
  //           ...item,
  //           ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida',
  //           ds_status: ic_status ? ic_status.ds_status : 'Status Desconhecido'
  //         }
  //         this.icStatus=item.id_status;
  //       },
  //       error => {
  //         console.error('Erro ao buscar dados:', error);
  //       }
  //     );
  //   } else{
  //     console.error("Id não encontrado")
  //   }
  // }

   updateItem(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Name:', this.name);

    try {
      const response: any = this.http.patch(
        `${this.apiItems}/${this.listaId}/${this.itemId}`,
        { nm_item:this.name, vl_uni:this.price, qtde_item:this.quantity, id_status: this.icStatus, id_medida:this.medidaSelecionada,id_lista:this.listaId}
      ).toPromise();

      console.log('Item atualizado com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }


  deleteItem(): void {
   
    try {
      const response: any = this.http.delete(
        `http://localhost:3001/api/items/${this.itemId}`
      ).toPromise();

      console.log('Item deletado com sucesso:', response);
      
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao deletar item: ', err);
    }

  }
   textForm: FormGroup;

}
