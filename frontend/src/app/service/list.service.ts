import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private newListSubject = new BehaviorSubject<any[]>([]);
  public newList$: Observable<any[]> = this.newListSubject.asObservable();
  private apiLists = 'http://localhost:3001/api/lists';

  constructor(private http: HttpClient) {}

  setList(newList: any[]): void {
    this.newListSubject.next(newList);
  }

  addNewList(newList: any): void {
    this.newListSubject.next(newList);
  }

  updateList(updatedList: any): void {
    const currentLists = this.newListSubject.getValue();
    const updatedLists = currentLists.map(l => l.id_lista === updatedList.id_lista ? updatedList : l);
    this.newListSubject.next([...updatedLists]);
  }

  deleteList(listId: number): void {
    const currentLists = this.newListSubject.getValue();
    const updatedLists = currentLists.filter(l => l.id !== listId);
    this.newListSubject.next([...updatedLists]);
  }

  loadList(listId: number): Observable<any> {
    return this.http.get<any>(`${this.apiLists}/${listId}`);
  }
}
