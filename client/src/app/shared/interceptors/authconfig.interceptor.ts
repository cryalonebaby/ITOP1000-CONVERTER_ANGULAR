import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

// we will disable Authorization header for currency api get because of CORS
export const PASS_TOKEN = new HttpContextToken(() => false)

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken()
    const ifPassToken = request.context.get(PASS_TOKEN) === true
    if(authToken && !ifPassToken) {
      request = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${authToken}`
        }
      })
    }
    return next.handle(request);
  }
}
