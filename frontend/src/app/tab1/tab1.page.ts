import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userName: string | undefined;

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Adicione esta linha para verificar o token no console
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Adicione esta linha para verificar o token decodificado no console
      this.userName = decodedToken.userName; // Supondo que o email do usuário esteja no token com a chave 'userEmail'
    }
  }
}
