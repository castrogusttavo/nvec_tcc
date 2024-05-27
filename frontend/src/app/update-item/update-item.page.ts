import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

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

  medidaSelecionada!:string;
  name!:string;
  price!:string;
  quantity!:number;
  icStatus!:string;

  // @Input() button: string = '';
  // @Input() onSubmitFunction: Function | undefined;
  // //Coloquei como indefinido

  // @Input() nameNome: string = '';
  // @Input() nameNg: string = '';

  // @Input() valueNome: string = '';
  // @Input() valueNg: string = '';
  
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
      this.listaId = params['idLista'];
      this.itemId = params['idItem'];
    });
    this.getItem();
    this.getMeasures().subscribe(measures => {
      this.measures = measures;
    });
  }

  

  getStatus():Observable<any[]>{
    return this.http.get<any[]>(this.apiMeasures);
  }
  getMeasures():Observable<any[]>{
    return this.http.get<any[]>(this.apiMeasures);
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
          this.icStatus=item.id_status;
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else{
      console.error("Id não encontrado")
    }
  }

   updateItem(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Name:', this.name);

    try {
      const response: any = this.http.patch(
        `http://localhost:3001/api/items/${this.itemId}`,
        { nm_item:this.name, vl_uni:this.price, qtde_item:this.quantity, id_status: this.icStatus, id_medida:this.medidaSelecionada,id_lista:this.listaId}
      ).toPromise();

      console.log('Item atualizado com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }

  deleteItem(): void {
    this.http.delete<any>(`${this.apiItems}/${this.itemId}`).subscribe(
      response => {
        console.log('Item excluído com sucesso:', response);
        this.router.navigate(['/tabs/tab1']);
      },
      error => {
        console.error('Erro ao excluir item:', error);
      }
    );
  }


  // updateCounter(event: any) {
  //   const input = event.target;
  //   const maxLength = parseInt(input.getAttribute('maxlength'), 10);
  //   const currentLength = input.value.length;
  //   const counter = input.parentElement.querySelector('.counter');
  //   if (counter) {
  //     counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
  //   }
  // }

  // formatCurrency(event: any) {
  //   let input = event.target;
  //   let value = input.value.replace(/\D/g, ''); 
  //   value = value.replace(/^0+/, ''); 
  //   value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  //   value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  //   input.value = value;
  // }

   // FormGroup para validação dos campos de texto
   textForm: FormGroup;


}
