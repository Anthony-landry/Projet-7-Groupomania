import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/home/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();
    if(authToken !== null){
      const token = JSON.parse(authToken).token
      const newRequest = req.clone({
        setHeaders: {
            'x-access-token': `${token}`
        }
    });
      return next.handle(newRequest);
    } else{
      return next.handle(req)
    }



  }
}
