import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

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
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
