import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/_models/authentication/LoginRequest';
import { LoginResponse } from 'src/app/_models/authentication/LoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  public authenticate(username: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = new LoginRequest(username, password);
    return this.http.post<LoginResponse>(`${environment.apiEndpoint}/auth/signin`, loginRequest, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }),
      observe: 'body'
    });
  }
}
