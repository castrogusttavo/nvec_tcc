import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.page.html',
  styleUrls: ['./login-account.page.scss'],
})
export class LoginAccountPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  fazerLogin() {
  
  }

}
