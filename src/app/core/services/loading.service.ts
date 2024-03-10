import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  constructor() { }

  //after 2 sec hide loading get called
  showLoading() {
    this._loading.next(true);
  }

  hideLoading() {
    this._loading.next(false);
  }


}
