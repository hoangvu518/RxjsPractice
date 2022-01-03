import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  constructor() { }


  getData(): Observable<number[]>{
    return of([1, 2, 3]);
  }

  getInterval(): Observable<number>{
    return interval(1000);
  }
}
