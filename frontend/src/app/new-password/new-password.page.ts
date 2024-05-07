import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  userEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  async changePassword(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (this.newPassword !== this.confirmNewPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (this.newPassword.length < 8) {
      console.error('Password must be at least 8 characters long');
      return;
    }

  try {
    const response = await this.http.patch('http://localhost:3001/api/change-password', {
      email: this.userEmail,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }
  ).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    ).toPromise();

  console.log("Senha alterada com sucesso: ", response);
  this.router.navigate(['/acount']);
  } catch (error) {
    console.error("Erro ao alterar senha: ", error);
  }
  }
}
