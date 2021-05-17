import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenDto } from '../model/token-dto';

const header = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiBase + '/oauth/'

  constructor(private http: HttpClient) { }

  public googleLogin(tokenDto: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.url + 'google', tokenDto, header)
  }
}
