import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get(environment.isAuthenticated, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          return response.status == 200;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.get(environment.refreshToken);
  }

  signOut(userId: number): Observable<any> {
    return this.http.post(
      environment.signOut,
      {
        userId: userId,
      },
      { responseType: 'text' }
    );
  }
}
