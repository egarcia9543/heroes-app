import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 404:
              console.error('Not found');
              return this.router.navigateByUrl('heroes/list')
            case 500:
              console.error('Internal server error');
              return this.router.navigateByUrl('heroes/list')
            default:
              console.error('Unknown error');
              return this.router.navigateByUrl('heroes/list')
          }
        }
        return throwError(error);
      })
    )
  }
}
