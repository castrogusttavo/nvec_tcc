import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-lists-itens-screen',
  templateUrl: './lists-itens-screen.page.html',
  styleUrls: ['./lists-itens-screen.page.scss'],
})
export class ListsItensScreenPage implements OnInit {

  public listaId!: string;
  items!: any[];
  lista: any = {};
  categories!: any[];
  vlGasto: number = 0;
  apiList = `http://localhost:3001/api/list`;
  apiCategories = "http://localhost:3001/api/categories";
  apiItems = 'http://localhost:3001/api/items';
  apiMeasures = "http://localhost:3001/api/measures";
  apiStatus = "http://localhost:3001/api/status";
  measures!: any[];
  status!: any[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private itemService: ItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getList();
    this.getItems();
    this.itemService.items$.subscribe(items => {
      this.items = items;
    });
    this.itemService.vlGasto$.subscribe(vlGasto => {
      this.vlGasto = vlGasto;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês é base zero, então adicionamos 1
    const year = date.getFullYear().toString().slice(-2); // Pegamos os últimos dois dígitos do ano
    return `${day}/${month}/${year}`;
  }

  getItems(): void {
    if (this.listaId) {
      forkJoin({
        items: this.http.get<any[]>(this.apiItems, { params: { listId: this.listaId } }),
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
          console.log('Dados dos itens:', data); 
          this.items = data;
          this.itemService.setItems(data); // Atualize o serviço com os itens obtidos
        },
        error => console.error('Erro ao buscar dados:', error)
      );
    } else {
      console.error("Id não encontrado");
    }
  }

  getList(): void {
    if (this.listaId) {
      const apiLista = `${this.apiList}/${this.listaId}`;

      forkJoin({
        list: this.http.get<any>(apiLista),
        categories: this.http.get<any[]>(this.apiCategories)
      }).subscribe(
        ({ list, categories }) => {
          console.log('Dados da lista:', list); // Adiciona este console.log para exibir os dados da lista
          console.log('Dados das categorias:', categories); // Adiciona este console.log para exibir os dados das categorias

          this.categories = categories;

          const category = this.categories.find(
            categoria => categoria.id_categoria === list.id_categoria
          );
          this.lista = {
            ...list,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida'
          }
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else {
      console.error("Id não encontrado")
    }
  }

  onStatusChange(itemId: number, status: boolean) {
    console.log(`Item ID: ${itemId}, Novo status: ${status}`);

    const statusId = status ? 2 : 1;

    this.http.patch(`http://localhost:3001/api/items/${itemId}`,
      { id_status: statusId })
      .subscribe(
        response => {
          console.log("Status atualizado: ", response);
          this.itemService.updateItemStatus(itemId, status); // Atualize o serviço com o novo status
        },
        error => {
          console.error("Erro ao atualizar status do item: ", error);
        }
      )
  }
}
