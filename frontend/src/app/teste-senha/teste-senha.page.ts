import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-senha',
  templateUrl: './teste-senha.page.html',
  styleUrls: ['./teste-senha.page.scss'],
})
export class TesteSenhaPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {
  }

  createUser() {
    console.log('Nome:', this.name);
    console.log('Email:', this.email);
    console.log('Senha:', this.password);
  }
  
}
