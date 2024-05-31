import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterRequest } from '../interfaces/register-request';
import { Observable, map } from 'rxjs';
import { CurrentUser } from '../../shared/interfaces/current-user';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { LoginRequest } from '../interfaces/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  register(request: RegisterRequest): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/users`;
    return this.http.post<AuthResponse>(url, request).pipe(map(this.getUser));
  }

  login(request: LoginRequest): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/users/login`;
    return this.http.post<AuthResponse>(url, request).pipe(map(this.getUser));
  }

  private getUser(data: AuthResponse): CurrentUser {
    return data.user;
  }
}
