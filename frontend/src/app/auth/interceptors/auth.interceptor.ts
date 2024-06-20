import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EventBusService } from '../../shared/services/event-bus.service';
import { EventData } from '../../shared/class/event.class';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone();
    return handler.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('sign-in') &&
          error.status === 401
        ) {
          return this.handle401Error(req, handler);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, handler: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.isAuthenticated()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return handler.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '401') {
              this.eventBusService.emit(new EventData('sign-out', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return handler.handle(request);
  }
}
