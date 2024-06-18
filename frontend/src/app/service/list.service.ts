import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private newListSubject = new Subject<any>();
  newList$ = this.newListSubject.asObservable();

  private updateListSubject = new Subject<any>();
  updateList$ = this.updateListSubject.asObservable();

  setList(newList: any[]) {
    this.newListSubject.next(newList);
  }

  addNewList(newList: any) {
    this.newListSubject.next(newList);
  }

  updateList(updatedList: any) {
    this.updateListSubject.next(updatedList);
  }
}
