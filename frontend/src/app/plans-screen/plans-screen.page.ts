import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.page.html',
  styleUrls: ['./plans-screen.page.scss'],
})
export class PlansScreenPage implements OnInit {
  activeSubscriptionId: number | null = null;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.extractSubscriptionId();
  }

  extractSubscriptionId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      this.activeSubscriptionId = decodedToken.subscriptionId;
    }
  }

  isPlanActive(planId: number): boolean {
    return this.activeSubscriptionId === planId;
  }

  getPlanClass(planId: number): string {
    return this.isPlanActive(planId) ? 'active-plan' : '';
  }
}
