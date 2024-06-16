import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadeService {
  private comunidadesSubject = new BehaviorSubject<any[]>([]);
  comunidades$ = this.comunidadesSubject.asObservable();

  setComunidades(comunidades: any[]) {
    this.comunidadesSubject.next(comunidades);
  }

  addComunidade(comunidade: any) {
    const currentComunidades = this.comunidadesSubject.value;
    this.comunidadesSubject.next([...currentComunidades, comunidade]);
  }
}
