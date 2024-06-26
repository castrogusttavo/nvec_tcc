import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.page.html',
  styleUrls: ['./acount.page.scss'],
})
export class AcountPage implements OnInit {
  email: string = '';
  name: string = '';
  userSubscriptionId: number | undefined;
  showCard: boolean = false; // Variable to control card visibility

  userEmail: string = 'email';  // Placeholder value
  userName: string = 'username';  // Placeholder value

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUserData();
  }

  async logout(): Promise<void> {
    try {
      await this.http.post('http://localhost:3001/api/logout', {}).toPromise();
      console.log('Logout bem-sucedido');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      this.router.navigate(['/login-account']);
    }
  }

  loadUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.userName || 'username';
      this.userEmail = decodedToken.userEmail || 'email';
      this.userSubscriptionId = decodedToken.subscriptionId;
      this.cdr.detectChanges();
    }
    console.log('Dados do usuário carregados:', this.userName, this.userEmail, this.userSubscriptionId);
  }

  updateUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.userId;
      this.http.patch<any>(`http://localhost:3001/api/users/${userId}`, { nm_usuario: this.name }).subscribe(
        (data) => {
          console.log('Usuário atualizado com sucesso:', data);
          this.userName = this.name; // Atualiza o nome do usuário exibido na interface
          this.name = ''; // Limpa o campo de entrada de nome
          if (data.token) {
            localStorage.setItem('token', data.token); // Atualiza o token no localStorage
            this.loadUserData(); // Recarrega os dados do usuário com o novo token
          }
        },
        (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }

  isPlanActive(planId: number): boolean {
    return this.userSubscriptionId === planId;
  }

  toggleCardVisibility(): void {
    this.showCard = !this.showCard;
  }

  @HostListener('document:click', ['$event'])
  closeCard(event: MouseEvent): void {
    if (this.showCard) {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest('.card-container') && !targetElement.closest('.button-medium-config')) {
        this.showCard = false;
      }
    }
  }
}
