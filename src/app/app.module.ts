import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OperatorComponent} from './layers/operator/operator.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from "./app-routing.module";
import {OperatorService} from "./layers/operator/service/operator.service";
import { CalendarComponent } from './layers/calendar/calendar.component';
import { AComponent } from './layers/a/a.component';

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    CalendarComponent,
    AComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [OperatorService],
  bootstrap: [AppComponent],

  exports: [RouterModule]
})
export class AppModule {
}
