import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, finalize, of } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    return of(null).pipe(
      delay(300), // delay of 500ms
      concatMap(() => next.handle(request)),
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
