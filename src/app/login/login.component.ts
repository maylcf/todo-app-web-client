import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenDto } from '../model/token-dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isLogged: boolean;
  socialUser: SocialUser;
  userLogged: SocialUser;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: AuthService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(data => {
      this.userLogged = data;
      this.isLogged = this.userLogged != null && this.tokenService.getToken() != null;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenGoogle = new TokenDto(this.socialUser.idToken)

      this.oauthService.googleLogin(tokenGoogle).subscribe(
        response => {
          console.log("googleLogin : Positive response!", response)
          this.tokenService.setToken(response.value, this.socialUser)
          // this.tokenService.setGoogleToken(data)
          this.isLogged = true;
          this.router.navigate(['/']);
        },
        error => {
          console.log("authService Google Error", error)
          this.signOut()
        });
    }).catch(error => {
      console.log("signInWithGoogle Error", error)
    });
  }

  signOut(): void {
    this.authService.signOut().then(data => {
      this.tokenService.logout();
      this.isLogged = false;
    });
  }
}
