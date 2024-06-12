import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userName: string | undefined;
  private previousToken: string | null = null;
  private currentUrl: string;

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    this.checkTokenChanges();
    this.preventPageStacking();
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.userName;
    }
  }

  checkTokenChanges(): void {
    setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== this.previousToken) {
        this.previousToken = currentToken;
        this.getUserName();
      }
    }, 1000);
  }

  preventPageStacking(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (this.currentUrl === event.urlAfterRedirects) {
        this.router.navigateByUrl(this.currentUrl, { skipLocationChange: true });
      } else {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }
}
