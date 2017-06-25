export class HighChartsThemeSettings {

    static chartBackgroundColor = "rgba(255, 255, 255, 0.1)";

    static options = {
        colors: ['#B9F2A1', '#6EBA8C', '#0E8174', '#005562', '#FFFFFF'],
        title: {
            style: {
                color: '#FFF'
            }
        },
        xAxis: {
            gridLineWidth: 0,
            lineColor: '#999',
            tickColor: '#999',
            labels: {
                style: {
                    color: '#FFF',
                }
            },
            title: {
                style: {
                    color: '#FFF',
                }
            }
        },
        yAxis: {
            gridLineColor: 'rgba(255, 255, 255, .1)',
            minorGridLineColor: 'rgba(255,255,255,0.07)',
            labels: {
                style: {
                    color: '#FFF',
                }
            },
            title: {
                style: {
                    color: '#FFF',
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#CCC'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#333'
            }
        },
        tooltip: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(96, 96, 96, .8)'],
                    [1, 'rgba(16, 16, 16, .8)']
                ]
            },
            borderWidth: 0,
            style: {
                color: '#FFF'
            }
        },
    }

    static columnChart = { type: 'column', backgroundColor: HighChartsThemeSettings.chartBackgroundColor }
}