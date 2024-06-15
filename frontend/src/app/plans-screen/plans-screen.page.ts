import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../service/cache.service'; // Importe o serviço de cache

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.page.html',
  styleUrls: ['./plans-screen.page.scss'],
  providers: [CacheService] // Forneça o serviço aqui, se necessário
})
export class PlansScreenPage implements OnInit {
  userSubscriptionId: number | undefined;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private cacheService: CacheService) {}

  ngOnInit() {
    this.getUserSubscriptionId(); // Chame o método para obter a assinatura do usuário ao inicializar a página
  }

  getUserSubscriptionId(): void {
    const token = this.cacheService.getCache('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userSubscriptionId = decodedToken.subscriptionId;
    }
  }

  isPlanActive(planId: number): boolean {
    return this.userSubscriptionId === planId;
  }

  updateUserSubscription(planId: number): void {
    const token = this.cacheService.getCache('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.userId;
      this.http.patch<any>(`http://localhost:3001/api/users/${userId}`, { id_assinatura: planId }).subscribe(
        (data) => {
          console.log('ID de assinatura do usuário atualizado com sucesso:', data);
          this.userSubscriptionId = planId;
          if (data.token) {
            this.cacheService.setCache('token', data.token); 
            this.getUserSubscriptionId(); 
          }
        },
        (error) => {
          console.error('Erro ao atualizar ID de assinatura do usuário:', error);
        }
      );
    }
  }
}
