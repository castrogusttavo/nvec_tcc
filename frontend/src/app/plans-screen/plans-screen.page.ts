import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-plans-screen',
  templateUrl: './plans-screen.page.html',
  styleUrls: ['./plans-screen.page.scss'],
})
export class PlansScreenPage implements OnInit {
  userSubscriptionId: number | undefined;

  constructor(private jwtHelper: JwtHelperService) {}

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
}
