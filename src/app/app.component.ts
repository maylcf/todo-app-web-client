import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'todo-app-web-client';

  userLogged: SocialUser;
  isLogged: boolean;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(data => {
      this.userLogged = data;
      this.isLogged = this.userLogged != null && this.tokenService.getToken() != null;
    });
  }

  logout() {

  }
}
