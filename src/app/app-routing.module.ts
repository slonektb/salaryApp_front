import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperatorComponent} from "./layers/operator/operator.component";
import {GlobalGuard} from "./layers/auth/global.guard";
import {CalendarComponent} from "./layers/calendar/calendar.component";
import {AComponent} from "./layers/a/a.component";

const routes: Routes = [
  {path: '', component: CalendarComponent, pathMatch: 'full', canActivate: [GlobalGuard]},
  {path: 'operator/test', component: AComponent, canActivate: [GlobalGuard]},
  // {path: 'operator/date', component: CalendarComponent, canActivate: [GlobalGuard]},
  {path: 'operator/change/:day', component: OperatorComponent, canActivate: [GlobalGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
