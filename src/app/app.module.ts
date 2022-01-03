import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsTestComponent } from './rxjs-test/rxjs-test.component';
import { PresentationListComponent } from './presentation-list/presentation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsTestComponent,
    PresentationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
