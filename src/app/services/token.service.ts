import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialUser } from 'angularx-social-login';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUserToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USER_KEY);
  }

  public setToken(token: string, socialUser: SocialUser): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, socialUser.name);
  }

  public logout() {
    sessionStorage.clear();
  }

  isUserAuthenticated(): boolean {
    const token = this.getToken()

    if (token) {
      console.log("Token Expiration Date", this.jwtHelper.getTokenExpirationDate(token))
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }

    return false;
  }
}
