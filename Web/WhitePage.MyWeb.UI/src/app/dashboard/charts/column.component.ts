import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardModule } from '../dashboard.module';

@Component({
    selector: 'column-chart',
    templateUrl: 'column.component.html'
})

export class ColumnComponent implements OnInit {
    constructor() {
        this.options = {
            title: { text: 'Column Chart' },
            chart: { type: 'column', backgroundColor: "#abb0ba" },
            series: [{
                name: "sec",
                data: [{
                    name: 'Point 1',
                    color: '#00FF00',
                    y: 1
                }, {
                    name: 'Point 2',
                    color: '#FF00FF',
                    y: 5
                }]
            },
            {
                name: "Gol",
                data: [{
                    name: 'Point 1',
                    color: '#00FF00',
                    y: 1
                }, {
                    name: 'Point 2',
                    color: '#FF00FF',
                    y: 5
                }]
            }]
        };
    }

    public options: Object;

    ngOnInit(): void{
    }
};