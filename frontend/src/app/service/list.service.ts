import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private newListSubject = new Subject<any>();
  newList$ = this.newListSubject.asObservable();

  addNewList(newList: any) {
    this.newListSubject.next(newList);
  }
}
