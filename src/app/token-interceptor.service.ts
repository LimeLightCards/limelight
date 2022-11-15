import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if(req.url.includes('.json')) {
      return next.handle(req);
    }

    const token = JSON.parse(localStorage.getItem('ngx-webstorage|token') || '""');
    if(token) {
      req = req.clone({
        setHeaders: {

          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
