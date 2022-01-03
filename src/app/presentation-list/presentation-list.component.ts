import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyValue } from '../rxjs-test/rxjs-test.component';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationListComponent implements OnInit, AfterViewInit, OnChanges, DoCheck, AfterContentChecked, AfterViewChecked {

  @Input() numberList$!: Observable<CurrencyValue[]>
  @ViewChildren("myContainer") ele!: QueryList<ElementRef>;
  constructor(private renderer: Renderer2) { }
  ngAfterViewChecked(): void {
    //  const element = this.renderer.selectRootElement(`.item:last-of-type`, false);

    // console.log(element);
    // this.ele.forEach(x=> console.log(x));

    console.log(this.ele.length);


    this.ele.last.nativeElement.scrollIntoView(false);
    console.log("after view check");
  }
  ngAfterContentChecked(): void {

    // const element = this.renderer.selectRootElement(`.item`, false);
    // console.log(element);
    console.log("after content check")
  }
  ngDoCheck(): void {
    // throw new Error('Method not implemented.');

    // const element = this.renderer.selectRootElement(`.item`, false);
    // console.log(element);
    console.log("do check");
  }
  ngOnChanges(changes: SimpleChanges): void {
    // const fragment = 'bottom';

    // const element = this.renderer.selectRootElement(`.item-container`, false);
    // console.log(element);
    //  const element = this.renderer.selectRootElement(`.item`, true);
    //  if (element == null || element == undefined){
    //    return;
    //  }
    // const element = this.renderer.selectRootElement(`#${fragment}`, true);

    // element?.scrollIntoView({ behavior: 'smooth' });

    console.log("on change");
  }
  ngAfterViewInit(): void {
    console.log("after view init");

  }

  ngOnInit(): void {
  }

  getColor(item: CurrencyValue){
    return item.isUpComparedToPrevious? "green": "red"
  }
}
