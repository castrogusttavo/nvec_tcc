import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.page.html',
  styleUrls: ['./plans-screen.page.scss'],
})
export class PlansScreenPage implements OnInit {
  userSubscriptionId: number | undefined;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  ngOnInit() {
    this.getUserSubscriptionId();
  }

  getUserSubscriptionId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userSubscriptionId = decodedToken.subscriptionId;
    }
  }

  isPlanActive(planId: number): boolean {
    return this.userSubscriptionId === planId;
  }

  updateUserSubscription(planId: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.userId;
      this.http.patch<any>(`http://localhost:3001/api/users/${userId}`, { id_assinatura: planId }).subscribe(
        (data) => {
          console.log('ID de assinatura do usuário atualizado com sucesso:', data);
          this.userSubscriptionId = planId; // Atualiza o ID de assinatura do usuário localmente
        },
        (error) => {
          console.error('Erro ao atualizar ID de assinatura do usuário:', error);
          // Tratar erros ou exibir uma mensagem de erro para o usuário
        }
      );
    }
  }
}
