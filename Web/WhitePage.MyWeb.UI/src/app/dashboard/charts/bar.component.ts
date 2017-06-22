import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardModule } from '../dashboard.module';

@Component({
    selector: 'bar-chart',
    templateUrl: 'bar.component.html'
})

export class BarComponent implements OnInit {
    constructor() {
        this.options = {
            title: { text: 'Column Chart' },
            chart: { type: 'bar', backgroundColor: "#abb0ba" },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        };
    }

    public options: Object;

    ngOnInit(): void{
    }
};