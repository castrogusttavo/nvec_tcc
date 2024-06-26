import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../service/item.service';

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

  listaId!: number;
  itemId!: number;

  apiList = 'http://localhost:3001/api/list';
  apiCategories = 'http://localhost:3001/api/categories';
  apiItems = 'http://localhost:3001/api/items';
  apiMeasures = 'http://localhost:3001/api/measures';
  apiStatus = 'http://localhost:3001/api/status';
  measures!: any[];
  status!: any[];
  item: any = {};
  quantity_measure!: number;

  medidaSelecionada!: string;
  name: string = '';
  price: string = '';
  formattedPrice!: string;
  quantity: number | null = null;
  icStatus!: string;

  textForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
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
      console.log(this.listaId);
    });
    this.getItem();
    this.getMeasures().subscribe(measures => {
      this.measures = measures;
    });
  }

  getStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMeasures);
  }

  getMeasures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMeasures);
  }

  getItem(): void {
    if (this.itemId) {
      forkJoin({
        item: this.http.get<any>(`${this.apiItems}/${this.itemId}`),
        measures: this.http.get<any[]>(this.apiMeasures),
        status: this.http.get<any[]>(this.apiStatus)
      }).subscribe(
        ({ item, measures, status }) => {
          this.measures = measures; 
          this.status = status; 

          const measure = this.measures.find(
            medida => medida.id_medida === item.id_medida
          );
          const ic_status = this.status.find(
            status => status.id_status === item.id_status
          );
          this.item = {
            ...item,
            ds_medida: measure ? measure.ds_medida : 'Medida Desconhecida',
            ds_status: ic_status ? ic_status.ds_status : 'Status Desconhecido'
          };
          this.icStatus = item.id_status;
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else {
      console.error("Id não encontrado");
    }
  }

  updateItem(event: any) {
    event.preventDefault();

    console.log('Name:', this.listaId);

    try {
      this.http.patch(
        `http://localhost:3001/api/items/${this.itemId}`,
        {
          nm_item: this.name,
          vl_uni: parseFloat(this.price.replace(/[^\d.,]/g, '').replace(',', '.')),
          qtde_item: this.quantity,
          id_status: this.icStatus,
          id_medida: this.medidaSelecionada,
          id_lista: this.listaId,
          qtde_medida_item: this.quantity_measure
        }
      ).toPromise().then((response: any) => {
        console.log('Item atualizado com sucesso:', response);
        this.itemService.updateItem(response);
        this.router.navigate([`/lists-items/${this.listaId}`])
          .then(() => {
            this.itemService.loadListAndItems(this.listaId);
          });
      });
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }

  deleteItem(): void {
    try {
      this.http.delete(
        `http://localhost:3001/api/items/${this.itemId}`
      ).toPromise().then((response: any) => {
        console.log('Item deletado com sucesso:', response);
        this.router.navigate(['/tabs/tab1']);
      });
    } catch (err) {
      console.error('Erro ao deletar item: ', err);
    }
  }

  formatCurrency(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      event.target.value = '';
      this.price = '';  // Reset the price value
      return;
    }
    const numericValue = (Number(value) / 100).toFixed(2).toString();
    this.price = numericValue;  // Store the numeric value
    const formattedValue = numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    event.target.value = `R$ ${formattedValue}`;
  }

  formatValueForDisplay(value: string): string {
    const numericValue = parseFloat(value).toFixed(2);
    return `R$ ${numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}
