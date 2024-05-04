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
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  userId: number = 1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // Verifique se o usuário está autenticado e recupere seu ID
  }

  async changePassword(event: Event) {
    event.preventDefault();

    if (this.newPassword !== this.confirmNewPassword) {
      console.error('As novas senhas não correspondem');
      return;
    }

    console.log('Senha atual:', this.currentPassword);
    console.log('Nova senha:', this.newPassword);

    /* const userId = this.userId;

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/users/change-password`,
        {
          userId,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao alterar senha:', error);
          return throwError(error);
        })
      )
      .toPromise();

      console.log('Senha alterada com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
    } */

    try {
      const response: any = await this.http.patch('http://localhost:3001/api/users/5', { senha_usuario: this.newPassword }).toPromise();

      console.log('Senha alterado com sucesso: ', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao alterar senha: ', err);
    }
  }
}
