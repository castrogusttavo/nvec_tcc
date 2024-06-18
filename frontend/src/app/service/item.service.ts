import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public items$: Observable<any[]> = this.itemsSubject.asObservable();

  private vlGastoSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public vlGasto$: Observable<number> = this.vlGastoSubject.asObservable();

  constructor(private http: HttpClient) { }

  setItems(items: any[]): void {
    console.log('Configurando itens:', items);
    this.itemsSubject.next(items);
    this.calculateVlGasto(items);
  }

  setVlGasto(vlGasto: number) {
    this.vlGastoSubject.next(vlGasto);
  }

  addItem(item: any): void {
    const currentItems = this.itemsSubject.getValue();
    const updatedItems = [...currentItems, item];
    console.log('Adicionando item:', item);
    this.itemsSubject.next(updatedItems);
    this.calculateVlGasto(updatedItems);
  }

  updateItem(updatedItem: any): void {
    const currentItems = this.itemsSubject.getValue();
    const updatedItems = currentItems.map(item => item.id_item === updatedItem.id_item ? updatedItem : item);
    this.itemsSubject.next(updatedItems);
    this.calculateVlGasto(updatedItems);
  }

  updateItemStatus(itemId: number, status: boolean): void {
    const currentItems = this.itemsSubject.getValue();
    const updatedItems = currentItems.map(item => {
      if (item.id_item === itemId) {
        return { ...item, id_status: status ? 2 : 1 };
      }
      return item;
    });
    this.itemsSubject.next(updatedItems);
    this.calculateVlGasto(updatedItems);
  }

  loadListAndItems(listId: number) {
    forkJoin({
      list: this.http.get<any>(`http://localhost:3001/api/list/${listId}`),
      items: this.http.get<any[]>(`http://localhost:3001/api/items`, { params: { listId: listId.toString() } })
    }).subscribe(({ list, items }) => {
      this.setItems(items);
    });
  }

  private calculateVlGasto(items: any[]): void {
    const vlGasto = items.reduce((total, item) => {
      if (item.id_status === 2) { // Consider only items with status 2
        return total + (item.vl_uni * item.qtde_item);
      }
      return total;
    }, 0);
    this.vlGastoSubject.next(vlGasto);
  }
}
