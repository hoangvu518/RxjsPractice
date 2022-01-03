import { Component, OnInit } from '@angular/core';
import {
  delay,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  concatMap,
  mergeMap,
  interval,
  BehaviorSubject,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { RxjsService } from '../rxjs.service';
export interface CurrencyValue {
  value: number;
  isUpComparedToPrevious: boolean;
}

@Component({
  selector: 'app-rxjs-test',
  templateUrl: './rxjs-test.component.html',
  styleUrls: ['./rxjs-test.component.css'],
})
export class RxjsTestComponent implements OnInit {
  constructor(public rxjsService: RxjsService) {}
  myData$?: Observable<any>;
  myInterval$?: Observable<Date>;

  obs1$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  interval$ = interval(500);

  values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  chartState: CurrencyValue[] = [];
  rate = 1000; //1000ms
  private _subject$ = new BehaviorSubject(this.chartState);
  private _subscription$!: Subscription;

  disableButton$ = new BehaviorSubject(true);
  ngOnInit(): void {
    // this.rxjsService.getData().subscribe((number)=> console.log(number));
    // this.myData$ = this.rxjsService.getData();
    // this.myInterval$ = this.rxjsService.getInterval().pipe(
    //   map((timeer) => new Date())
    // );

    // this.obs1$.pipe(
    //   concatMap(x=> of(x).pipe(
    //                             delay(2000),
    //                             tap(x=>   this.buttonState = [...this.buttonState, x])
    //                           )
    //            )
    // ).subscribe(x=> this._subject$.next(this.buttonState));

    // this._subscription$ = this.interval$
    //   .pipe(
    //     concatMap((x) =>
    //       of(Math.random()).pipe(
    //         tap(x => this.setCurrencyObject(x)

    //           // (this.buttonState = [...this.buttonState, value])
    //         )
    //       )
    //     )
    //   )
    //   .subscribe((x) => this._subject$.next(this.buttonState));

    this._subscription$ = this.getChart().subscribe((x) =>
      this._subject$.next(this.chartState)
    );
  }

  getChart(): Observable<number> {
    return interval(this.rate).pipe(
      concatMap((x) =>
        of(Math.random()).pipe(
          tap(
            (x) => this.setCurrencyObject(x)
            // (this.buttonState = [...this.buttonState, value])
          )
        )
      )
    );
  }

  setCurrencyObject(number: number) {
    // let value: CurrencyValue

    const value = <CurrencyValue>{
      value: number,
      isUpComparedToPrevious:
        this.chartState.length == 0
          ? true
          : number >= this.chartState[this.chartState.length - 1].value
          ? true
          : false,
    };

    if (this.chartState.length > 99){
      this.chartState.shift();
    }
    this.chartState = [...this.chartState, value];

    // if (this.buttonState.length == 0){
    //   const _isUpComparedToPrevious = true;
    //   value = <CurrencyValue>{
    //     value: number,
    //     isUpComparedToPrevious: _isUpComparedToPrevious
    //   };
    //   (this.buttonState = [...this.buttonState, value]);
    //   return;
    // }

    // if (number >= this.buttonState[this.buttonState.length -1].value){
    //   const _isUpComparedToPrevious = true;
    //   value = <CurrencyValue>{
    //     value: number,
    //     isUpComparedToPrevious: _isUpComparedToPrevious
    //   };
    //   (this.buttonState = [...this.buttonState, value]);
    //   return;
    // }else{
    //   const _isUpComparedToPrevious = false;
    //   value = <CurrencyValue>{
    //     value: number,
    //     isUpComparedToPrevious: _isUpComparedToPrevious
    //   };

    //   return;
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  stop() {
    this._subscription$.unsubscribe();
    this.disableButton$.next(false);
  }

  resume() {
    if (this._subscription$.closed) {
      // this._subscription$ = this.interval$
      //   .pipe(
      //     concatMap((x) =>
      //       of(Math.random()).pipe(tap((x) => this.setCurrencyObject(x)))
      //     )
      //   )
      //   .subscribe((x) => this._subject$.next(this.buttonState));

      this._subscription$ = this.getChart().subscribe((x) =>
        this._subject$.next(this.chartState)
      );
      this.disableButton$.next(true);
    }
  }

  reset() {
    this.chartState = [];
    this._subject$.next(this.chartState);
  }
  addButton() {
    // this.buttonState.push(1);
    // this.buttonState = [...this.buttonState, 1];
    // console.log("button is clicked")
    this._subject$.next(this.chartState);
  }

  search(searchTerm: string) {
    return;
  }

  adjustRate(rate: number) {
    // this._rate$.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(500),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   tap(x=> this._rate$.next(x))

    // )
    this._subscription$.unsubscribe();
    this.rate = rate*100;
    this._subscription$ = this.getChart()
      .subscribe((x) => this._subject$.next(this.chartState));
  }
}
