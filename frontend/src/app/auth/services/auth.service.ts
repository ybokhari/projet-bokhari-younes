import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<any> {
    return this.http.post(environment.signUp, userData);
  }

  signIn(userData: any): Observable<any> {
    return this.http.post(environment.signIn, userData);
  }

  getUser(): Observable<any> {
    return this.http.get(environment.getUser);
  }

  refreshToken(): Observable<any> {
    return this.http.get(environment.refreshToken);
  }

  signOut(userId: number): Observable<any> {
    return this.http.post(environment.signOut, { userId: userId });
  }
}
