import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'https://localhost:3001/api/users/users';

    constructor(private http: HttpClient) { }

    login(dadosLogin: any) {
      return this.http.post<any>(`${this.apiUrl}/users/users`, dadosLogin);
    }
}
