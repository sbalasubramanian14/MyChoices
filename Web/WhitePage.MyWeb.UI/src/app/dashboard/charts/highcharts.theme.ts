export class HighChartsThemeSettings {

    static chartBackgroundColor = "rgba(255, 255, 255, 0.1)";

    static options = {
        colors: ['#B9F2A1', '#6EBA8C', '#0E8174', '#005562', '#FFFFFF',
            '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#6AF9C4',
            '#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
            "#6794a7", "#014d64", "#76c0c1", "#01a2d9", "#7ad2f6", "#00887d", "#adadad", "#7bd3f6", "#7c260b", "#ee8f71", "#76c0c1", "#a18376"],
        title: {
            style: {
                color: '#FFF'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
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

    static decimalPointDataLabels =
    {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.y:,.2f}'
            }
        }
    }

    static columnChart = { type: 'column', backgroundColor: HighChartsThemeSettings.chartBackgroundColor }
}