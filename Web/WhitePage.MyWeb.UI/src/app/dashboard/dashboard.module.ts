import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

//charts
import { TotalNewCasesComponent } from './charts/total_new_cases.component';
import { TotalOpenCasesComponent } from './charts/total_open_cases.component';
import { TotalClosedCasesComponent } from './charts/total_closed_cases.component';
import { CaseResolutionRateComponent } from './charts/case_resolution_rate.component';
import { TotalCounselingHoursComponent } from './charts/total_counseling_hours.component';
import { TotalSessionsComponent } from './charts/total_sessions.component';

export function highchartsFactory() {
    return highcharts;
}

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartModule,
        CommonModule
    ],
  providers: [
      {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
      }],
  declarations: [
      DashboardComponent,
      TotalNewCasesComponent,
      TotalOpenCasesComponent,
      TotalClosedCasesComponent,
      CaseResolutionRateComponent,
      TotalCounselingHoursComponent,
      TotalSessionsComponent]
})
export class DashboardModule { }
